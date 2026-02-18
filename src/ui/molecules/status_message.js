//#region Molecule: Status Message

const get_status_message_el = () => document.getElementById("status-message");

//#region F_Show_Status_Message
export function F_Show_Status_Message(p_message, p_type) {
    const status_message_el = get_status_message_el();
    status_message_el.textContent = p_message;
    status_message_el.className =
        "fixed top-20 left-1/2 -translate-x-1/2 p-3 rounded-xl shadow-lg font-medium text-sm z-50 transition-all duration-300 ease-in-out";

    if (p_type === "success") {
        status_message_el.classList.add(
            "bg-green-100",
            "text-green-800",
            "dark:bg-green-900",
            "dark:text-green-200"
        );
    } else if (p_type === "error") {
        status_message_el.classList.add(
            "bg-red-100",
            "text-red-800",
            "dark:bg-red-900",
            "dark:text-red-200"
        );
    } else {
        status_message_el.classList.add(
            "bg-blue-100",
            "text-blue-800",
            "dark:bg-blue-900",
            "dark:text-blue-200"
        );
    }

    status_message_el.classList.remove("hidden");
    setTimeout(() => {
        status_message_el.classList.add("hidden");
    }, 3000);
}
//#endregion

//#endregion
