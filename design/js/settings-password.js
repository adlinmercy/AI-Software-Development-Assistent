// ==========================================
// DEVCORE AI - FIREBASE PASSWORD CHANGE
// ==========================================

import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import { app } from "./firebase-config.js";

const auth = getAuth(app);

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const passwordMessage =
    document.getElementById("passwordMessage");

const currentPasswordInput =
    document.getElementById("currentPassword");

const newPasswordInput =
    document.getElementById("newPassword");

const confirmPasswordInput =
    document.getElementById("confirmPassword");


// ==========================================
// DISPLAY SUCCESS MESSAGE
// ==========================================

function showPasswordSuccess(message) {
    if (passwordMessage) {
        passwordMessage.textContent = message;
        passwordMessage.classList.add("show");
    } else {
        alert(message);
    }
}


// ==========================================
// CHANGE PASSWORD
// ==========================================

if (changePasswordBtn) {

    changePasswordBtn.addEventListener("click", async () => {

        const currentPassword =
            currentPasswordInput.value;

        const newPassword =
            newPasswordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        // Validate the fields.

        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Please complete all password fields.");
            return;
        }

        if (newPassword.length < 6) {
            alert("New password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            alert("Your new password must differ from your current password.");
            return;
        }


        // Get the authenticated Firebase user.

        const user = auth.currentUser;

        if (!user) {
            alert("You are not signed in. Please sign in and try again.");
            return;
        }

        if (!user.email) {
            alert("Your Firebase account does not have an email address.");
            return;
        }

        // This implementation supports email/password accounts.
        const supportsPasswordLogin =
            user.providerData.some(
                provider => provider.providerId === "password"
            );

        if (!supportsPasswordLogin) {
            alert(
                "Your account does not use email/password sign-in. " +
                "Password changes must be handled by your sign-in provider."
            );
            return;
        }


        // Prevent duplicate submissions.

        const originalButtonText = changePasswordBtn.textContent;

        changePasswordBtn.disabled = true;
        changePasswordBtn.textContent = "Updating Password...";


        try {

            // Verify the current password with Firebase.

            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            await reauthenticateWithCredential(
                user,
                credential
            );


            // Update the password in Firebase.

            await updatePassword(
                user,
                newPassword
            );


            // Clear fields only after a successful update.

            currentPasswordInput.value = "";
            newPasswordInput.value = "";
            confirmPasswordInput.value = "";

            showPasswordSuccess(
                "Password changed successfully."
            );

        } catch (error) {

            console.error(
                "Password change failed:",
                error
            );

            switch (error.code) {

                case "auth/invalid-credential":
                case "auth/wrong-password":
                case "auth/invalid-login-credentials":
                    alert("Your current password is incorrect.");
                    break;

                case "auth/weak-password":
                    alert(
                        "Your new password is too weak. " +
                        "Please choose a stronger password."
                    );
                    break;

                case "auth/requires-recent-login":
                    alert(
                        "Your session has expired for this operation. " +
                        "Please sign out, sign in again, and retry."
                    );
                    break;

                case "auth/too-many-requests":
                    alert(
                        "Too many attempts. Please wait before trying again."
                    );
                    break;

                default:
                    alert(
                        "Unable to change your password. " +
                        "Please check your connection and try again."
                    );
            }

        } finally {

            changePasswordBtn.disabled = false;
            changePasswordBtn.textContent = originalButtonText;

        }

    });

}