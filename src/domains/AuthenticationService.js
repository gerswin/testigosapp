import { Auth as amplifyAuth, Hub } from 'aws-amplify'
import { CurrentUserInfo } from './CurrentUserInfo'
import { useAuthenticationEmitter } from './AuthenticationObserver'
import { ConfirmationRequiredEvent } from './ConfirmationRequiredEvent'
import { useAuthenticationStore } from '~/store/authentication'

const listener = (data) => {
    switch (data.payload.event) {
        case 'signOut':
            console.log('User signed out')
            break
    }
}

Hub.listen('auth', listener)

const newPasswordUser = { value: null }

export default function useAuthenticationService() {
    const authenticationStore = useAuthenticationStore()
    const authenticationEmitter = useAuthenticationEmitter()

    async function signOut() {
        try {
            await amplifyAuth.signOut()
            await authenticationStore.logout()
            authenticationEmitter.dispatchSignOut()
        } catch (error) {
            console.log('Error', error.name)
        }
    }

    async function forceSignOut() {
        if (authenticationStore.isAuthenticated.value) {
            await signOut()
            authenticationEmitter.dispatchForceSignOut()
        }
    }

    async function completeNewPassword(newPassword, requiredAttributes = {}) {
        try {
            if (!newPasswordUser.value)
                throw new Error('There is no userAccount to set new password')

            await amplifyAuth.completeNewPassword(
                newPasswordUser.value,
                newPassword,
                requiredAttributes
            )

            await signOut()
        } catch (error) {
            console.log('Error', JSON.stringify(error))
            throw error
        }
    }

    async function signIn({ email = String(), password = String() }) {
        try {
            const userCredentials = {
                username: email || undefined,
                password: password || undefined,
            }

            await amplifyAuth.signIn(userCredentials)

            await amplifyAuth.signOut({ global: true })

            const userAuthenticated = await amplifyAuth.signIn(userCredentials)

            const { username, attributes, challengeName } = userAuthenticated

            if (challengeName === 'NEW_PASSWORD_REQUIRED') {
                newPasswordUser.value = userAuthenticated

                return authenticationEmitter.dispatchNewPasswordRequired()
            }

            const currentUserInfo = CurrentUserInfo.create({
                uuid: username,
                firstName: attributes.given_name,
                lastName: attributes.family_name,
                email: attributes.email,
                phoneNumber: attributes.phone_number,
                profile: attributes.profile,
                identityDocument: attributes['custom:identity_document'],
            })

            await authenticationStore.login(currentUserInfo)

            authenticationEmitter.dispatchSignIn()
        } catch (error) {
            if (error.code === 'UserNotConfirmedException')
                authenticationEmitter.dispatchConfirmationRequired(
                    ConfirmationRequiredEvent.create({ email })
                )

            throw error
        }
    }

    async function signUp({
                              firstName = String(),
                              lastName = String(),
                              email = String(),
                              password = String(),
                              phoneNumber = String(),
                              profile = String(),
                              identityDocument = String(),
                          }) {
        try {
            const { userConfirmed } = await amplifyAuth.signUp({
                username: email || undefined,
                password: password || undefined,
                attributes: {
                    given_name: firstName || undefined,
                    family_name: lastName || undefined,
                    phone_number: phoneNumber || undefined,
                    profile: profile || undefined,
                    'custom:identity_document': identityDocument || undefined,
                },
            })

            if (userConfirmed) {
                return authenticationEmitter.dispatchSignUp()
            }

            authenticationEmitter.dispatchConfirmationRequired(
                ConfirmationRequiredEvent.create({ email })
            )
        } catch (error) {}
    }

    async function confirmSignUp({ email, code }) {
        return await amplifyAuth.confirmSignUp(email, code)
    }

    async function resendSignUp(email) {
        return await amplifyAuth.resendSignUp(email)
    }

    async function forgotPassword(email) {
        return await amplifyAuth.forgotPassword(email)
    }

    async function forgotPasswordSubmit(email, code, newPassword) {
        return await amplifyAuth.forgotPasswordSubmit(email, code, newPassword)
    }

    /**
     * Returns the current authenticated user info or null
     *
     * @returns {Promise<CurrentUserInfo|null>}
     */
    async function currentUser(store) {
        try {
            const currentUser = await amplifyAuth.currentAuthenticatedUser({
                bypassCache: true,
            })

            console.log('Current user', currentUser)

            const currentUserInfo = CurrentUserInfo.create({
                uuid: currentUser.username,
                firstName: currentUser.attributes.given_name,
                lastName: currentUser.attributes.family_name,
                email: currentUser.attributes.email,
                phoneNumber: currentUser.attributes.phone_number,
                profile: currentUser.attributes.profile,
                identityDocument:
                    currentUser.attributes['custom:identity_document'],
            })

            await authenticationStore.login(currentUserInfo)

            return currentUserInfo
        } catch (error) {
            if (
                error.name === 'NotAuthorizedException' ||
                error === 'The user is not authenticated'
            )
                return await forceSignOut()

            return null
        }
    }

    async function recoverPassword() {
        try {
            return await Promise.resolve({})
        } catch (error) {}
    }

    return {
        signOut,
        confirmSignUp,
        forgotPassword,
        forgotPasswordSubmit,
        signIn,
        signUp,
        currentUser,
        resendSignUp,
        recoverPassword,
        completeNewPassword,
    }
}
