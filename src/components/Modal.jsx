import { StyleSheet } from 'react-native'
import { View, KeyboardAvoidingView, Modal as RNModal } from 'react-native'
import { PLATFORM } from '@constants'


const Modal = ({ isOpen, withInput, children, ...rest }) => {
    const content = withInput ? (
        <KeyboardAvoidingView
            style={styles.modalWindow}
            behavior={PLATFORM === 'ios' ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>)
        :
        (
            <View style={styles.modalWindow}>
                {children}
            </View>
        )
    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...rest}
        >
            {content}
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modalWindow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 12,
        backgroundColor: "rgba(24, 24, 27, 0.6)"

    }
})

export default Modal;

