import { Alert, Platform } from 'react-native'
import { PLATFORM } from '@constants'

const alertPolyfill = (title, description, options, extra) => {
    const result = window.confirm([title, description].filter(Boolean).join('\n'))

    if (options) {
        if (result) {
            const confirmOption = options.find(({ style }) => style !== 'cancel')
            confirmOption && confirmOption.onPress()
        } else {
            const cancelOption = options.find(({ style }) => style === 'cancel')
            cancelOption && cancelOption.onPress()
        }
    }
}

const alert = PLATFORM === 'web' ? alertPolyfill : Alert.alert

export default alert