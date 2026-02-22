const REQUEST_TIMEOUT_MS = 10000;

const parseResponseBody = async (response) => {
  const contentType = (response.headers.get('content-type') || '').toLowerCase();

  try {
    if (contentType.includes('application/json')) {
      return await response.json();
    }

    const text = await response.text();
    return text ? { message: text } : {};
  } catch (_) {
    return {};
  }
};

const getErrorMessage = (body, fallback) => {
  if (!body || typeof body !== 'object') {
    return fallback;
  }

  if (typeof body.message === 'string' && body.message.trim()) {
    return body.message;
  }

  if (typeof body.error === 'string' && body.error.trim()) {
    return body.error;
  }

  return fallback;
};

const exchangeCode = async ({ code, state }) => {
  console.log('[whatsapp-sso] exchangeCode invoked', {
    hasCode: Boolean(code),
    hasState: Boolean(state)
  });

  if (!code || !state) {
    console.warn('[whatsapp-sso] exchangeCode validation failed: missing code/state');
    return {
      ok: false,
      error: {
        type: 'validation_error',
        status: 400,
        message: 'Both code and state are required'
      }
    };
  }

  const exchangeUrl = (process.env.WHIZRANGE_EXCHANGE_URL || '').trim();
  const appKey = (process.env.WHIZRANGE_APP_KEY || '').trim();
  const appSecret = (process.env.WHIZRANGE_APP_SECRET || '').trim();

  console.log('[whatsapp-sso] exchangeCode config snapshot', {
    exchangeUrl,
    appKey,
    hasAppSecret: Boolean(appSecret)
  });

  if (!exchangeUrl.startsWith('http://') && !exchangeUrl.startsWith('https://')) {
    console.error('[whatsapp-sso] Invalid WHIZRANGE_EXCHANGE_URL configuration');
    return {
      ok: false,
      error: {
        type: 'configuration_error',
        status: 500,
        message: 'WHIZRANGE_EXCHANGE_URL is missing or invalid'
      }
    };
  }

  if (!appKey || !appSecret) {
    console.error('[whatsapp-sso] Missing WHIZRANGE_APP_KEY/WHIZRANGE_APP_SECRET');
    return {
      ok: false,
      error: {
        type: 'configuration_error',
        status: 500,
        message: 'WHIZRANGE_APP_KEY or WHIZRANGE_APP_SECRET is missing'
      }
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    console.log('[whatsapp-sso] Calling Whizrange exchange endpoint');
    response = await fetch(exchangeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-APP-KEY': appKey,
        'X-APP-SECRET': appSecret
      },
      body: JSON.stringify({
        code,
        state,
        appKey
      }),
      signal: controller.signal
    });
  } catch (error) {
    clearTimeout(timeout);

    const isTimeout = error && error.name === 'AbortError';
    console.error('[whatsapp-sso] Exchange request failed before response', {
      isTimeout,
      message: error && error.message ? error.message : undefined
    });
    return {
      ok: false,
      error: {
        type: isTimeout ? 'timeout_error' : 'network_error',
        status: 502,
        message: isTimeout
          ? 'Whizrange exchange request timed out'
          : 'Unable to reach Whizrange exchange endpoint'
      }
    };
  }

  clearTimeout(timeout);

  const payload = await parseResponseBody(response);
  console.log('[whatsapp-sso] Exchange response received', {
    status: response.status,
    ok: response.ok
  });

  if (!response.ok) {
    console.error('[whatsapp-sso] Exchange endpoint returned error', {
      status: response.status,
      message: getErrorMessage(payload, `Whizrange exchange failed with status ${response.status}`)
    });
    return {
      ok: false,
      error: {
        type: 'upstream_error',
        status: response.status,
        message: getErrorMessage(payload, `Whizrange exchange failed with status ${response.status}`),
        details: payload && typeof payload === 'object' ? payload : undefined
      }
    };
  }

  console.log('[whatsapp-sso] Exchange successful');
  return payload;
};

module.exports = {
  exchangeCode
};
