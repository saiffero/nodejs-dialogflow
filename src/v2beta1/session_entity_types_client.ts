// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  PaginationCallback,
  PaginationResponse,
} from 'google-gax';
import * as path from 'path';

import {Transform} from 'stream';
import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './session_entity_types_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Entities are extracted from user input and represent parameters that are
 *  meaningful to your application. For example, a date range, a proper name
 *  such as a geographic location or landmark, and so on. Entities represent
 *  actionable data for your application.
 *
 *  Session entity types are referred to as **User** entity types and are
 *  entities that are built for an individual user such as
 *  favorites, preferences, playlists, and so on. You can redefine a session
 *  entity type at the session level.
 *
 *  Session entity methods do not work with Google Assistant integration.
 *  Contact Dialogflow support if you need to use session entities
 *  with Google Assistant integration.
 *
 *  For more information about entity types, see the
 *  [Dialogflow
 *  documentation](https://cloud.google.com/dialogflow/docs/entities-overview).
 * @class
 * @memberof v2beta1
 */
export class SessionEntityTypesClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  auth: gax.GoogleAuth;
  sessionEntityTypesStub: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of SessionEntityTypesClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof SessionEntityTypesClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof SessionEntityTypesClient).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      projectPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/agent'
      ),
      projectIntentPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/agent/intents/{intent}'
      ),
      projectLocationPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/agent'
      ),
      projectLocationIntentPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/agent/intents/{intent}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listSessionEntityTypes: new gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'sessionEntityTypes'
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.dialogflow.v2beta1.SessionEntityTypes',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.dialogflow.v2beta1.SessionEntityTypes.
    this.sessionEntityTypesStub = gaxGrpc.createStub(
      opts.fallback
        ? (protos as protobuf.Root).lookupService(
            'google.cloud.dialogflow.v2beta1.SessionEntityTypes'
          )
        : // tslint:disable-next-line no-any
          (protos as any).google.cloud.dialogflow.v2beta1.SessionEntityTypes,
      opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const sessionEntityTypesStubMethods = [
      'listSessionEntityTypes',
      'getSessionEntityType',
      'createSessionEntityType',
      'updateSessionEntityType',
      'deleteSessionEntityType',
    ];

    for (const methodName of sessionEntityTypesStubMethods) {
      const innerCallPromise = this.sessionEntityTypesStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/dialogflow',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  getSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  getSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      | protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Retrieves the specified session entity type.
   *
   * This method doesn't work with Google Assistant integration.
   * Contact Dialogflow support if you need to use session entities
   * with Google Assistant integration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the session entity type. Format:
   *   `projects/<Project ID>/agent/sessions/<Session ID>/entityTypes/<Entity Type
   *   Display Name>` or `projects/<Project ID>/agent/environments/<Environment
   *   ID>/users/<User ID>/sessions/<Session ID>/entityTypes/<Entity Type Display
   *   Name>`. If `Environment ID` is not specified, we assume default 'draft'
   *   environment. If `User ID` is not specified, we assume default '-' user.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [SessionEntityType]{@link google.cloud.dialogflow.v2beta1.SessionEntityType}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
          | protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      | protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IGetSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.getSessionEntityType(request, options, callback);
  }
  createSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  createSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      | protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Creates a session entity type.
   *
   * If the specified session entity type already exists, overrides the
   * session entity type.
   *
   * This method doesn't work with Google Assistant integration.
   * Contact Dialogflow support if you need to use session entities
   * with Google Assistant integration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The session to create a session entity type for.
   *   Format: `projects/<Project ID>/agent/sessions/<Session ID>` or
   *   `projects/<Project ID>/agent/environments/<Environment ID>/users/<User ID>/
   *   sessions/<Session ID>`. If `Environment ID` is not specified, we assume
   *   default 'draft' environment. If `User ID` is not specified, we assume
   *   default '-' user.
   * @param {google.cloud.dialogflow.v2beta1.SessionEntityType} request.sessionEntityType
   *   Required. The session entity type to create.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [SessionEntityType]{@link google.cloud.dialogflow.v2beta1.SessionEntityType}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
          | protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      | protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.ICreateSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.createSessionEntityType(
      request,
      options,
      callback
    );
  }
  updateSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  updateSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Updates the specified session entity type.
   *
   * This method doesn't work with Google Assistant integration.
   * Contact Dialogflow support if you need to use session entities
   * with Google Assistant integration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.dialogflow.v2beta1.SessionEntityType} request.sessionEntityType
   *   Required. The entity type to update. Format:
   *   `projects/<Project ID>/agent/sessions/<Session ID>/entityTypes/<Entity Type
   *   Display Name>` or `projects/<Project ID>/agent/environments/<Environment
   *   ID>/users/<User ID>/sessions/<Session ID>/entityTypes/<Entity Type Display
   *   Name>`. If `Environment ID` is not specified, we assume default 'draft'
   *   environment. If `User ID` is not specified, we assume default '-' user.
   * @param {google.protobuf.FieldMask} request.updateMask
   *   Optional. The mask to control which fields get updated.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [SessionEntityType]{@link google.cloud.dialogflow.v2beta1.SessionEntityType}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  updateSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
          | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'session_entity_type.name': request.sessionEntityType!.name || '',
    });
    return this._innerApiCalls.updateSessionEntityType(
      request,
      options,
      callback
    );
  }
  deleteSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  deleteSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Deletes the specified session entity type.
   *
   * This method doesn't work with Google Assistant integration.
   * Contact Dialogflow support if you need to use session entities
   * with Google Assistant integration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the entity type to delete. Format:
   *   `projects/<Project ID>/agent/sessions/<Session ID>/entityTypes/<Entity Type
   *   Display Name>` or `projects/<Project ID>/agent/environments/<Environment
   *   ID>/users/<User ID>/sessions/<Session ID>/entityTypes/<Entity Type Display
   *   Name>`. If `Environment ID` is not specified, we assume default 'draft'
   *   environment. If `User ID` is not specified, we assume default '-' user.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  deleteSessionEntityType(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.protobuf.IEmpty,
          | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteSessionEntityTypeRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.deleteSessionEntityType(
      request,
      options,
      callback
    );
  }

  listSessionEntityTypes(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesResponse
    ]
  >;
  listSessionEntityTypes(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesResponse
    >
  ): void;
  /**
   * Returns the list of all session entity types in the specified session.
   *
   * This method doesn't work with Google Assistant integration.
   * Contact Dialogflow support if you need to use session entities
   * with Google Assistant integration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The session to list all session entity types from.
   *   Format: `projects/<Project ID>/agent/sessions/<Session ID>` or
   *   `projects/<Project ID>/agent/environments/<Environment ID>/users/<User ID>/
   *   sessions/<Session ID>`.
   *   If `Environment ID` is not specified, we assume default 'draft'
   *   environment. If `User ID` is not specified, we assume default '-' user.
   * @param {number} request.pageSize
   *   Optional. The maximum number of items to return in a single page. By
   *   default 100 and at most 1000.
   * @param {string} request.pageToken
   *   Optional. The next_page_token value returned from a previous list request.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [SessionEntityType]{@link google.cloud.dialogflow.v2beta1.SessionEntityType}.
   *   The client library support auto-pagination by default: it will call the API as many
   *   times as needed and will merge results from all the pages into this array.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [SessionEntityType]{@link google.cloud.dialogflow.v2beta1.SessionEntityType} that corresponds to
   *   the one page received from the API server.
   *   If the second element is not null it contains the request object of type [ListSessionEntityTypesRequest]{@link google.cloud.dialogflow.v2beta1.ListSessionEntityTypesRequest}
   *   that can be used to obtain the next page of the results.
   *   If it is null, the next page does not exist.
   *   The third element contains the raw response received from the API server. Its type is
   *   [ListSessionEntityTypesResponse]{@link google.cloud.dialogflow.v2beta1.ListSessionEntityTypesResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listSessionEntityTypes(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType[],
          protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest | null,
          protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesResponse
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesResponse
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.ISessionEntityType[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.listSessionEntityTypes(
      request,
      options,
      callback
    );
  }

  /**
   * Equivalent to {@link listSessionEntityTypes}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listSessionEntityTypes} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The session to list all session entity types from.
   *   Format: `projects/<Project ID>/agent/sessions/<Session ID>` or
   *   `projects/<Project ID>/agent/environments/<Environment ID>/users/<User ID>/
   *   sessions/<Session ID>`.
   *   If `Environment ID` is not specified, we assume default 'draft'
   *   environment. If `User ID` is not specified, we assume default '-' user.
   * @param {number} request.pageSize
   *   Optional. The maximum number of items to return in a single page. By
   *   default 100 and at most 1000.
   * @param {string} request.pageToken
   *   Optional. The next_page_token value returned from a previous list request.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits an object representing [SessionEntityType]{@link google.cloud.dialogflow.v2beta1.SessionEntityType} on 'data' event.
   */
  listSessionEntityTypesStream(
    request?: protosTypes.google.cloud.dialogflow.v2beta1.IListSessionEntityTypesRequest,
    options?: gax.CallOptions
  ): Transform {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    const callSettings = new gax.CallSettings(options);
    return this._descriptors.page.listSessionEntityTypes.createStream(
      this._innerApiCalls.listSessionEntityTypes as gax.GaxCall,
      request,
      callSettings
    );
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  projectPath(project: string) {
    return this._pathTemplates.projectPathTemplate.render({
      project,
    });
  }

  /**
   * Parse the project from Project resource.
   *
   * @param {string} projectName
   *   A fully-qualified path representing project resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectName(projectName: string) {
    return this._pathTemplates.projectPathTemplate.match(projectName).project;
  }

  /**
   * Return a fully-qualified projectIntent resource name string.
   *
   * @param {string} project
   * @param {string} intent
   * @returns {string} Resource name string.
   */
  projectIntentPath(project: string, intent: string) {
    return this._pathTemplates.projectIntentPathTemplate.render({
      project,
      intent,
    });
  }

  /**
   * Parse the project from ProjectIntent resource.
   *
   * @param {string} projectIntentName
   *   A fully-qualified path representing project_intent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectIntentName(projectIntentName: string) {
    return this._pathTemplates.projectIntentPathTemplate.match(
      projectIntentName
    ).project;
  }

  /**
   * Parse the intent from ProjectIntent resource.
   *
   * @param {string} projectIntentName
   *   A fully-qualified path representing project_intent resource.
   * @returns {string} A string representing the intent.
   */
  matchIntentFromProjectIntentName(projectIntentName: string) {
    return this._pathTemplates.projectIntentPathTemplate.match(
      projectIntentName
    ).intent;
  }

  /**
   * Return a fully-qualified projectLocation resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @returns {string} Resource name string.
   */
  projectLocationPath(project: string, location: string) {
    return this._pathTemplates.projectLocationPathTemplate.render({
      project,
      location,
    });
  }

  /**
   * Parse the project from ProjectLocation resource.
   *
   * @param {string} projectLocationName
   *   A fully-qualified path representing project_location resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectLocationName(projectLocationName: string) {
    return this._pathTemplates.projectLocationPathTemplate.match(
      projectLocationName
    ).project;
  }

  /**
   * Parse the location from ProjectLocation resource.
   *
   * @param {string} projectLocationName
   *   A fully-qualified path representing project_location resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProjectLocationName(projectLocationName: string) {
    return this._pathTemplates.projectLocationPathTemplate.match(
      projectLocationName
    ).location;
  }

  /**
   * Return a fully-qualified projectLocationIntent resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} intent
   * @returns {string} Resource name string.
   */
  projectLocationIntentPath(project: string, location: string, intent: string) {
    return this._pathTemplates.projectLocationIntentPathTemplate.render({
      project,
      location,
      intent,
    });
  }

  /**
   * Parse the project from ProjectLocationIntent resource.
   *
   * @param {string} projectLocationIntentName
   *   A fully-qualified path representing project_location_intent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectLocationIntentName(projectLocationIntentName: string) {
    return this._pathTemplates.projectLocationIntentPathTemplate.match(
      projectLocationIntentName
    ).project;
  }

  /**
   * Parse the location from ProjectLocationIntent resource.
   *
   * @param {string} projectLocationIntentName
   *   A fully-qualified path representing project_location_intent resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProjectLocationIntentName(
    projectLocationIntentName: string
  ) {
    return this._pathTemplates.projectLocationIntentPathTemplate.match(
      projectLocationIntentName
    ).location;
  }

  /**
   * Parse the intent from ProjectLocationIntent resource.
   *
   * @param {string} projectLocationIntentName
   *   A fully-qualified path representing project_location_intent resource.
   * @returns {string} A string representing the intent.
   */
  matchIntentFromProjectLocationIntentName(projectLocationIntentName: string) {
    return this._pathTemplates.projectLocationIntentPathTemplate.match(
      projectLocationIntentName
    ).intent;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    if (!this._terminated) {
      return this.sessionEntityTypesStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
