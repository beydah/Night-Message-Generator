//#region Utility Functions

// --- Utility Functions: Cookie Management (30 days persistence) ---

//#region F_Set_Cookie
export function F_Set_Cookie(p_name, p_value, p_days) {
    let expires = "";
    if (p_days) {
        const date = new Date();
        date.setTime(date.getTime() + p_days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
        p_name + "=" + (p_value || "") + expires + "; path=/; SameSite=Lax";
}
//#endregion

//#region F_Get_Cookie
export function F_Get_Cookie(p_name) {
    const name_eq = p_name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(name_eq) == 0) return c.substring(name_eq.length, c.length);
    }
    return null;
}
//#endregion

//#region F_Clear_All_Cookies
export function F_Clear_All_Cookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eq_pos = cookie.indexOf("=");
        const name = eq_pos > -1 ? cookie.substring(0, eq_pos) : cookie;
        // Delete the cookie
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
}
//#endregion

//#endregion
