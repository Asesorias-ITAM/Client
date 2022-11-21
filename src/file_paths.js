const views = "views/"
const components = "components/"
const admin = "admin/"

const login = "login/"
const home = "home/"
const generic = "generic/"
const misc = "misc/"

// permite importar dinámicamente páginas y componentes para
// facilitar la modificación de la estructura del proyecto
export default {
    // ####################### User #########################
    // ######################################################
    // ---------Views---------
    // Login
    "LoginPage":            views + login + "LoginPage.vue",
    "RegisterPage":         views + login + "RegisterPage.vue",
    "ConfirmationPage":     views + login + "ConfirmationPage.vue",

    // Home
    "HomePage":             views + home + "HomePage.vue",
    "GroupPage":            views + home + "GroupPage.vue",
    "SearchGroupsPage":     views + home + "SearchGroupsPage.vue",
    "PublishGroupPage":     views + home + "PublishGroupPage.vue",
    "MyGroupsPage":         views + home + "PublishGroupPage.vue",
    "TutorsPage":     views + home + "TutorsPage.vue",

    // Misc.
    "NotFoundPage":         views + misc + "NotFoundPage.vue",
    // -----------------------

    // -------Components------
    // Login
    "UserForm":             components + login + "UserForm.vue",

    // Home
    "PublicationCard":      components + home + "PublicationCard.vue",
    "PublishGroupForm":     components + home + "PublishGroupForm.vue",
    "MenuButton":           components + home + "MenuButton.vue",
    "GroupCard":            components + home + "GroupCard.vue",

    // Generic
    "ActionButton":         components + generic + "ActionButton.vue",
    "RouterButton":         components + generic + "RouterButton.vue",
    "TextInput":            components + generic + "TextInput.vue",
    "TextArea":             components + generic + "TextArea.vue",
    "CustomLabel":          components + generic + "CustomLabel.vue",

    //Misc.
    "UpperBar":             components + misc + "UpperBar.vue",
    "ThemeButton":          components + misc + "ThemeButton.vue",
    // -----------------------

    // ######################################################   

    // ###################### Admin #########################
    // ######################################################
    // -------Views------
    // Login
    "AdminLoginPage":       views + admin + "AdminLoginPage.vue",

    // Home
    "AdminPage":            views + admin + "AdminPage.vue",
    "DirectorioPage":       views + admin + "DirectorioPage.vue",
    "PublicacionesPage":    views + admin + "PublicacionesPage.vue",
    // ------------------

    // -------Components------
    "DirectorioAlumnos":    components + admin + "DirectorioAlumnos.vue",
    "FilaTabla":            components + admin + "FilaTabla.vue",
    "TarjetaAlumno":        components + admin + "TarjetaAlumno.vue",
    "TarjetaPublicacion":   components + admin + "TarjetaPublicacion.vue",

    // -----------------------
    // ######################################################
}