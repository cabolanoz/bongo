import axios from 'axios';
import humps from 'humps';
import { Routes } from '../const';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;

    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      transformResponse: [
        ...axios.defaults.transformResponse,
        this.camelizeKeys.bind(this),
        this.updateCsrfToken.bind(this),
      ],
      transformRequest: [this.decamelizeKeys.bind(this), ...axios.defaults.transformRequest],
    });

    this.instance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  camelizeKeys(data) {
    return humps.camelizeKeys(data);
  }

  decamelizeKeys(data) {
    return humps.decamelizeKeys(data);
  }

  handleSuccess({ data = {} }) {
    return data;
  }

  handleError({ response = {} }) {
    const { config = {}, data, status } = response;
    const { error, meta } = data || {};
    const message =
      error || (meta && meta.errors ? meta.errors.join(', ') : 'Something went wrong.');
    const isLoginAttempt = config.url === '/api/sessions';

    // If session has expired, just redirect back to login.
    if (!isLoginAttempt && (status === 403 || status === 401)) {
      window.location = Routes.root();
    }

    return Promise.reject(new ApiError(message, status));
  }

  updateCsrfToken(response, headers = {}) {
    if (headers['x-csrf-token']) {
      this.setCSRFToken(headers['x-csrf-token']);
    }

    return response;
  }

  /**
   * API methods.
   */

  async getAlbums() {
    return this.get('albums');
  }

  async getCommercials() {
    return this.get('commercials');
  }

  /**
   * Request types methods.
   */
  async get(endpoint, params = {}) {
    // GET requests are handled differently within the interceptors. We need
    // to decamelizeKeys "manually" so we'll do it in this method.
    return this.instance.get(endpoint, { params: this.decamelizeKeys(params) });
  }

  async post(endpoint, params = {}) {
    this.ensureCsrf();
    return this.instance.post(endpoint, params);
  }

  async put(endpoint, params = {}) {
    this.ensureCsrf();
    return this.instance.put(endpoint, params);
  }

  async delete(endpoint) {
    this.ensureCsrf();
    return this.instance.delete(endpoint);
  }

  setCSRFToken(value) {
    if (value) {
      this.instance.defaults.headers['X-CSRF-Token'] = value;
    }
  }

  ensureCsrf() {
    if (!this.csrfToken()) {
      this.setCsrfFromHtml();
    }
  }

  csrfToken() {
    return this.instance.defaults.headers['X-CSRF-Token'];
  }

  setCsrfFromHtml() {
    const token = document.querySelector('meta[name="csrf-token"]');
    this.setCSRFToken(token.content);
  }
}
const api = new Api({ baseUrl: '/api' });

export default api;
