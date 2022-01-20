import { computed, readonly, useStore } from '@nuxtjs/composition-api'
import { CurrentUserInfo } from '~/domains/Authentication/CurrentUserInfo'

/**
 * @template T
 * @typedef {T[keyof T]} MapValues<T>
 */

export const AuthenticationNamespace = 'authentication'

export const AuthenticationStatuses = readonly({
    Unconfirmed: 'Unconfirmed',
    Guest: 'Guest',
    Authenticated: 'Authenticated',
})

export const AuthenticationMutations = readonly({
    SetUserInfo: 'SetUserInfo',
    ClearUserInfo: 'ClearUserInfo',
    SetAuthStatus: 'SetAuthStatus',
})

export const AuthenticationActions = readonly({
    Login: 'Login',
    Logout: 'Logout',
})

const AuthenticationState = {
    /**
     * @type {CurrentUserInfo|null}
     */
    userInfo: null,

    /**
     * @type {keyof AuthenticationStatuses}
     */
    authStatus: AuthenticationStatuses.Guest,

    invalid_credentials: false,
}

export const state = () => AuthenticationState

/**
 * @type {import("vuex").MutationTree<typeof AuthenticationState>}
 */
export const mutations = {
    SET_INVALID_CREDENTIALS(state, value) {
        state.invalid_credentials = value
    },

    [AuthenticationMutations.SetUserInfo](state, payload) {
        state.userInfo = payload
    },

    [AuthenticationMutations.ClearUserInfo](state) {
        state.userInfo = null
    },

    [AuthenticationMutations.SetAuthStatus](state, payload) {
        state.authStatus = payload
    },
}

/**
 * @type {import("vuex").ActionTree<typeof AuthenticationState>}
 */
export const actions = {
    /**
     *
     * @param context
     * @param {CurrentUserInfo} payload
     */
    [AuthenticationActions.Login](context, payload) {
        if (!(payload instanceof CurrentUserInfo))
            throw new TypeError(
                'Payload user info data must be an instance of CurrentUserInfo'
            )

        context.commit(AuthenticationMutations.SetUserInfo, payload)
        context.commit(
            AuthenticationMutations.SetAuthStatus,
            AuthenticationStatuses.Authenticated
        )
    },

    [AuthenticationActions.Logout](context) {
        context.commit(AuthenticationMutations.ClearUserInfo)
        context.commit(
            AuthenticationMutations.SetAuthStatus,
            AuthenticationStatuses.Guest
        )
    },
}

/**
 * @template S
 * @template C
 * @template A
 * @typedef {object} StoreModuleConsumer<S,C,A>
 * @property {() => S} state
 * @property {(type: C, payload) => void} commit
 * @property {<T=any>(type: A, payload) => Promise<T>} dispatch
 */

/**
 * @returns {StoreModuleConsumer}
 */
export const useStoreModule = (namespace = null) => {
    const store = useStore()

    const getExecutableName = (executable) =>
        namespace ? `${namespace}/${executable}` : executable

    const state = () => (namespace ? store.state[namespace] : store.state)

    const dispatch = (action, payload) =>
        store.dispatch(getExecutableName(action), payload)

    const commit = (type, payload) =>
        store.commit(getExecutableName(type), payload)

    return { commit, dispatch, state }
}

export const useAuthenticationStore = () => {
    /**
     * @type {StoreModuleConsumer<
     * typeof AuthenticationState,
     * keyof AuthenticationMutations,
     * keyof AuthenticationActions>}
     */
    const authenticationStore = useStoreModule(AuthenticationNamespace)

    const isAuthenticated = computed(
        () => authenticationStore.state().authStatus === 'Authenticated'
    )

    const isGuest = computed(
        () => authenticationStore.state().authStatus === 'Guest'
    )

    const isUnconfirmed = computed(
        () => authenticationStore.state().authStatus === 'Unconfirmed'
    )

    const currentUserInfo = computed(() => authenticationStore.state().userInfo)

    /**
     * Clear the user info and puts state on "Guest"
     *
     * @param {CurrentUserInfo} userInfo
     * @returns
     */
    const login = (userInfo) =>
        authenticationStore.dispatch(AuthenticationActions.Login, userInfo)

    /**
     * Clear the user info and puts state on "Guest"
     *
     * @returns
     */
    const logout = () =>
        authenticationStore.dispatch(AuthenticationActions.Logout)

    return {
        ...authenticationStore,
        currentUserInfo,
        logout,
        login,
        isAuthenticated,
        isGuest,
        isUnconfirmed,
    }
}
