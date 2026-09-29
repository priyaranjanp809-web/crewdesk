/* =================================
   CREWDESK JAVASCRIPT
================================= */


/* =================================
   AUTHENTICATION / USER DATA
================================= */

const USERS_KEY = "crewdeskUsers";
const CURRENT_USER_KEY = "crewdeskCurrentUser";


/* ---------- GET REGISTERED USERS ---------- */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

    } catch (error) {

        return [];

    }

}


/* ---------- SAVE USERS ---------- */

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/* ---------- GET CURRENT USER ---------- */

function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        );

    } catch (error) {

        return null;

    }

}


/* ---------- SAVE CURRENT USER ---------- */

function saveCurrentUser(user) {

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );

}


/* ---------- LOGOUT ---------- */

function logoutUser() {

    localStorage.removeItem(CURRENT_USER_KEY);

    window.location.href = "login.html";

}


/* ---------- GET INITIAL ---------- */

function getInitials(name) {

    if (!name) return "";

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {

        return words[0].charAt(0).toUpperCase();

    }

    return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
    ).toUpperCase();

}


/* ---------- FORMAT DATE ---------- */

function getTodayDate() {

    const today = new Date();

    return today.toLocaleDateString("en-IN", {

        day: "numeric",
        month: "long",
        year: "numeric"

    });

}


/* =================================
   MOBILE NAVIGATION
================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {

            menuToggle.textContent = "✕";

        } else {

            menuToggle.textContent = "☰";

        }

    });

}


/* =================================
   PASSWORD SHOW / HIDE
================================= */

const passwordButtons =
    document.querySelectorAll(".show-password");

passwordButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const targetId =
            button.getAttribute("data-target");

        const input =
            document.getElementById(targetId);

        if (!input) return;

        if (input.type === "password") {

            input.type = "text";

            button.textContent = "🙈";

        } else {

            input.type = "password";

            button.textContent = "👁";

        }

    });

});


/* =================================
   HELPER FUNCTIONS
================================= */

function showError(input, message) {

    const parent =
        input.closest(".form-group");

    if (!parent) return;

    const error =
        parent.querySelector(".error");

    if (error) {

        error.textContent = message;

    }

    input.style.borderColor = "#d9536a";

}


function clearError(input) {

    const parent =
        input.closest(".form-group");

    if (!parent) return;

    const error =
        parent.querySelector(".error");

    if (error) {

        error.textContent = "";

    }

    input.style.borderColor = "#dedfe6";

}


/* =================================
   EMPLOYEE REGISTRATION
================================= */

const registrationForm =
    document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const employeeName =
            document.getElementById("adminName");

        const employeeEmail =
            document.getElementById("companyEmail");

        const phone =
            document.getElementById("phone");

        const department =
            document.getElementById("industry");

        const address =
            document.getElementById("address");

        const password =
            document.getElementById("password");

        const confirmPassword =
            document.getElementById("confirmPassword");

        const terms =
            document.getElementById("terms");

        let valid = true;


        /* ---------- EMPLOYEE NAME ---------- */

        if (employeeName.value.trim() === "") {

            showError(
                employeeName,
                "Employee name is required."
            );

            valid = false;

        } else {

            clearError(employeeName);

        }


        /* ---------- EMAIL ---------- */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(
                employeeEmail.value.trim()
            )
        ) {

            showError(
                employeeEmail,
                "Enter a valid email address."
            );

            valid = false;

        } else {

            clearError(employeeEmail);

        }


        /* ---------- PHONE ---------- */

        const phonePattern =
            /^[6-9]\d{9}$/;

        if (
            !phonePattern.test(
                phone.value.trim()
            )
        ) {

            showError(
                phone,
                "Enter a valid 10-digit phone number."
            );

            valid = false;

        } else {

            clearError(phone);

        }


        /* ---------- DEPARTMENT ---------- */

        if (department.value === "") {

            showError(
                department,
                "Please select a department."
            );

            valid = false;

        } else {

            clearError(department);

        }


        /* ---------- ADDRESS ---------- */

        if (address.value.trim() === "") {

            showError(
                address,
                "Employee address is required."
            );

            valid = false;

        } else {

            clearError(address);

        }


        /* ---------- PASSWORD ---------- */

        if (password.value.length < 6) {

            showError(
                password,
                "Password must contain at least 6 characters."
            );

            valid = false;

        } else {

            clearError(password);

        }


        /* ---------- CONFIRM PASSWORD ---------- */

        if (
            confirmPassword.value === "" ||
            confirmPassword.value !== password.value
        ) {

            showError(
                confirmPassword,
                "Passwords do not match."
            );

            valid = false;

        } else {

            clearError(confirmPassword);

        }


        /* ---------- TERMS ---------- */

        const termsError =
            document.querySelector(".terms-error");

        if (!terms.checked) {

            termsError.textContent =
                "You must accept the Terms & Conditions.";

            valid = false;

        } else {

            termsError.textContent = "";

        }


        /* ---------- SAVE EMPLOYEE ---------- */

        if (valid) {

            const users = getUsers();

            const email =
                employeeEmail.value
                    .trim()
                    .toLowerCase();


            /* CHECK DUPLICATE EMAIL */

            const alreadyExists =
                users.some(function (user) {

                    return (
                        user.email &&
                        user.email.toLowerCase() === email
                    );

                });


            if (alreadyExists) {

                showError(
                    employeeEmail,
                    "This email is already registered."
                );

                return;

            }


            /* CREATE EMPLOYEE ID */

            const employeeId =
                "CD" +
                Math.floor(
                    1000 + Math.random() * 9000
                );


            /* CREATE EMPLOYEE OBJECT */

            const newUser = {

                id: employeeId,

                adminName:
                    employeeName.value.trim(),

                email:
                    email,

                phone:
                    phone.value.trim(),

                department:
                    department.value,

                address:
                    address.value.trim(),

                password:
                    password.value,

                role:
                    "Employee",

                joiningDate:
                    getTodayDate(),

                about:
                    "CrewDesk Employee"

            };


            /* SAVE USER */

            users.push(newUser);

            saveUsers(users);


            /* SUCCESS MESSAGE */

            alert(
                "✓ Employee registered successfully!\n\n" +
                "Employee ID: " +
                employeeId +
                "\n\n" +
                "You can now login using your Name, Email or Employee ID."
            );


            /* RESET FORM */

            registrationForm.reset();


            /* GO TO LOGIN */

            window.location.href =
                "login.html";

        }

    });

}


/* =================================
   LOGIN
================================= */

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const identifier =
                document.getElementById("loginEmail");

            const password =
                document.getElementById("loginPassword");


            let valid = true;


            /* ---------- IDENTIFIER ---------- */

            if (identifier.value.trim() === "") {

                showError(
                    identifier,
                    "Enter your name, email or Employee ID."
                );

                valid = false;

            } else {

                clearError(identifier);

            }


            /* ---------- PASSWORD ---------- */

            if (password.value.length < 6) {

                showError(
                    password,
                    "Enter a valid password."
                );

                valid = false;

            } else {

                clearError(password);

            }


            if (!valid) return;


            /* ---------- GET USERS ---------- */

            const users = getUsers();


            /* ---------- FIND USER ---------- */

            const enteredIdentifier =
                identifier.value.trim().toLowerCase();

            const user =
                users.find(function(item) {

                    return (

                        item.email.toLowerCase() ===
                        enteredIdentifier

                        ||

                        item.adminName.toLowerCase() ===
                        enteredIdentifier

                        ||

                        item.id.toLowerCase() ===
                        enteredIdentifier

                    );

                });


            /* ---------- CHECK USER ---------- */

            if (!user) {

                showError(
                    identifier,
                    "User not found. Please register first."
                );

                return;

            }


            /* ---------- CHECK PASSWORD ---------- */

            if (user.password !== password.value) {

                showError(
                    password,
                    "Incorrect password."
                );

                return;

            }


            /* =================================
               LOGIN SUCCESS
            ================================= */

            saveCurrentUser(user);


            alert(
                "✓ Login successful! Welcome " +
                user.adminName + "!"
            );


            /* ---------- GO HOME ---------- */

            window.location.href = "index.html";

        }
    );

}


/* =================================
   HOME PAGE - DYNAMIC USER NAME
================================= */

const welcomeUser =
    document.getElementById("welcomeUser");

if (welcomeUser) {

    const currentUser =
        getCurrentUser();


    if (currentUser) {

        welcomeUser.textContent =
            "WELCOME " +
            currentUser.adminName.toUpperCase();

    } else {

        welcomeUser.textContent =
            "HELLO 👋";

    }

}


/* =================================
   HOME PAGE PROFILE CIRCLE
================================= */

const profileCircle =
    document.querySelector(".profile-circle");

if (profileCircle) {

    const currentUser =
        getCurrentUser();

    if (currentUser) {

        profileCircle.textContent =
            getInitials(
                currentUser.adminName
            );

    } else {

        /*
           No logged-in user:
           Don't show anyone's profile initial.
        */

        profileCircle.textContent = "";

    }

}


/* =================================
   NAVBAR PROFILE MINI
================================= */

const profileMini =
    document.querySelector(".profile-mini");

if (profileMini) {

    const currentUser =
        getCurrentUser();

    if (currentUser) {

        profileMini.textContent =
            getInitials(
                currentUser.adminName
            );

        profileMini.title =
            currentUser.adminName;

    }

}


/* =================================
   DASHBOARD USER NAME
================================= */

const dashboardHeading =
    document.querySelector(
        ".dashboard-page h1"
    );

if (
    dashboardHeading &&
    !dashboardHeading.textContent.includes("My Tasks") &&
    !dashboardHeading.textContent.includes("Attendance") &&
    !dashboardHeading.textContent.includes("Announcements") &&
    !dashboardHeading.textContent.includes("My Profile")
) {

    const currentUser =
        getCurrentUser();

    if (currentUser) {

        dashboardHeading.textContent =
            "WELCOME, " +
            currentUser.adminName +
            " 👋";

    }

}


/* =================================
   TASK FILTER
================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const tasks =
    document.querySelectorAll(".large-task");

filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            filterButtons.forEach(
                function(btn) {

                    btn.classList.remove("active");

                }
            );


            button.classList.add("active");


            const filter =
                button.getAttribute("data-filter");


            tasks.forEach(function(task) {

                const status =
                    task.getAttribute("data-status");


                if (
                    filter === "all" ||
                    filter === status
                ) {

                    task.style.display = "flex";

                } else {

                    task.style.display = "none";

                }

            });

        }
    );

});


/* =================================
   COMPLETE TASK
================================= */

const completeButtons =
    document.querySelectorAll(".complete-task");

completeButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const task =
                button.closest(".large-task");


            const status =
                task.querySelector(".status");


            status.textContent =
                "Completed";


            status.className =
                "status completed";


            task.setAttribute(
                "data-status",
                "completed"
            );


            button.remove();


            alert(
                "✓ Task marked as completed!"
            );

        }
    );

});


/* =================================
   LEAVE FORM
================================= */

const leaveForm =
    document.getElementById("leaveForm");

if (leaveForm) {

    leaveForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const leaveType =
                document.getElementById("leaveType");

            const startDate =
                document.getElementById("startDate");

            const endDate =
                document.getElementById("endDate");

            const reason =
                document.getElementById("leaveReason");


            let valid = true;


            /* ---------- LEAVE TYPE ---------- */

            if (leaveType.value === "") {

                showError(
                    leaveType,
                    "Please select a leave type."
                );

                valid = false;

            } else {

                clearError(leaveType);

            }


            /* ---------- START DATE ---------- */

            if (startDate.value === "") {

                showError(
                    startDate,
                    "Please select a start date."
                );

                valid = false;

            } else {

                clearError(startDate);

            }


            /* ---------- END DATE ---------- */

            if (endDate.value === "") {

                showError(
                    endDate,
                    "Please select an end date."
                );

                valid = false;

            } else {

                clearError(endDate);

            }


            /* ---------- DATE CHECK ---------- */

            if (
                startDate.value &&
                endDate.value &&
                endDate.value < startDate.value
            ) {

                showError(
                    endDate,
                    "End date cannot be before start date."
                );

                valid = false;

            }


            /* ---------- REASON ---------- */

            if (reason.value.trim() === "") {

                showError(
                    reason,
                    "Please enter a reason."
                );

                valid = false;

            } else {

                clearError(reason);

            }


            /* ---------- SUCCESS ---------- */

            if (valid) {

                alert(
                    "✓ Leave request submitted successfully!"
                );

                leaveForm.reset();

            }

        }
    );

}


/* =================================
   CURRENT DATE
================================= */

const currentDate =
    document.getElementById("currentDate");

if (currentDate) {

    const today =
        new Date();


    currentDate.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

}


/* =================================
   CONTACT FORM
================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById("contactName");

            const email =
                document.getElementById("contactEmail");

            const subject =
                document.getElementById("contactSubject");

            const message =
                document.getElementById("contactMessage");


            let valid = true;


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            /* ---------- NAME ---------- */

            if (name.value.trim() === "") {

                showError(
                    name,
                    "Please enter your name."
                );

                valid = false;

            } else {

                clearError(name);

            }


            /* ---------- EMAIL ---------- */

            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                showError(
                    email,
                    "Enter a valid email."
                );

                valid = false;

            } else {

                clearError(email);

            }


            /* ---------- SUBJECT ---------- */

            if (subject.value.trim() === "") {

                showError(
                    subject,
                    "Please enter a subject."
                );

                valid = false;

            } else {

                clearError(subject);

            }


            /* ---------- MESSAGE ---------- */

            if (message.value.trim() === "") {

                showError(
                    message,
                    "Please enter your message."
                );

                valid = false;

            } else {

                clearError(message);

            }


            /* ---------- SUCCESS ---------- */

            if (valid) {

                alert(
                    "✓ Your message has been sent successfully!"
                );

                contactForm.reset();

            }

        }
    );

}


/* =================================
   FAQ
================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {

    question.addEventListener(
        "click",
        function() {

            const item =
                question.closest(".faq-item");


            item.classList.toggle("open");


            const symbol =
                question.querySelector("span");


            if (
                item.classList.contains("open")
            ) {

                symbol.textContent = "−";

            } else {

                symbol.textContent = "+";

            }

        }
    );

});


/* =================================
   PROFILE PAGE
================================= */

const profilePage =
    document.querySelector(".profile-layout");


if (profilePage) {

    const currentUser =
        getCurrentUser();


    /* ---------- NO LOGIN ---------- */

    if (!currentUser) {

        alert(
            "Please login first to view your profile."
        );

        window.location.href =
            "login.html";

    } else {

        /* ---------- PROFILE AVATAR ---------- */

        const avatar =
            document.querySelector(
                ".profile-avatar"
            );

        if (avatar) {

            avatar.textContent =
                getInitials(
                    currentUser.adminName
                );

        }


        /* ---------- PROFILE NAME ---------- */

        const profileName =
            document.querySelector(
                ".profile-card h2"
            );

        if (profileName) {

            profileName.textContent =
                currentUser.adminName;

        }


        /* ---------- ROLE ---------- */

        const profileRole =
            document.querySelector(
                ".profile-card p"
            );

        if (profileRole) {

            profileRole.textContent =
                currentUser.role;

        }


        /* ---------- EMPLOYEE ID ---------- */

        const profileDetails =
            document.querySelectorAll(
                ".profile-card .profile-detail"
            );


        /*
           If your existing profile HTML uses
           normal text instead of .profile-detail,
           the original content will remain.
        */


        /* ---------- PROFILE FORM ---------- */

        const profileInputs =
            document.querySelectorAll(
                ".profile-layout .main-form input"
            );

        const profileTextarea =
            document.querySelector(
                ".profile-layout .main-form textarea"
            );


        if (profileInputs.length >= 4) {

            profileInputs[0].value =
                currentUser.adminName;

            profileInputs[1].value =
                currentUser.email;

            profileInputs[2].value =
                currentUser.phone;

            profileInputs[3].value =
                currentUser.department;

        }


        if (profileTextarea) {

            profileTextarea.value =
                currentUser.about;

        }


        /* =================================
           EDIT PROFILE
        ================================= */

        const editProfile =
            document.getElementById("editProfile");

        const saveProfile =
            document.getElementById("saveProfile");


        if (editProfile && saveProfile) {

            editProfile.addEventListener(
                "click",
                function() {

                    const inputs =
                        document.querySelectorAll(
                            ".profile-layout input, " +
                            ".profile-layout textarea"
                        );


                    inputs.forEach(
                        function(input) {

                            input.disabled = false;

                        }
                    );


                    saveProfile.style.display =
                        "inline-flex";


                    editProfile.style.display =
                        "none";

                }
            );


            /* ---------- SAVE PROFILE ---------- */

            saveProfile.addEventListener(
                "click",
                function() {

                    const inputs =
                        document.querySelectorAll(
                            ".profile-layout .main-form input"
                        );


                    const textarea =
                        document.querySelector(
                            ".profile-layout .main-form textarea"
                        );


                    const newName =
                        inputs[0]
                            ? inputs[0].value.trim()
                            : currentUser.adminName;


                    const newEmail =
                        inputs[1]
                            ? inputs[1].value.trim().toLowerCase()
                            : currentUser.email;


                    const newPhone =
                        inputs[2]
                            ? inputs[2].value.trim()
                            : currentUser.phone;


                    const newDepartment =
                        inputs[3]
                            ? inputs[3].value.trim()
                            : currentUser.department;


                    const newAbout =
                        textarea
                            ? textarea.value.trim()
                            : currentUser.about;


                    if (newName === "") {

                        alert(
                            "Name cannot be empty."
                        );

                        return;

                    }


                    if (newEmail === "") {

                        alert(
                            "Email cannot be empty."
                        );

                        return;

                    }


                    /* ---------- UPDATE USER ---------- */

                    const users =
                        getUsers();


                    const userIndex =
                        users.findIndex(
                            function(user) {

                                return (
                                    user.id ===
                                    currentUser.id
                                );

                            }
                        );


                    if (userIndex !== -1) {

                        users[userIndex].adminName =
                            newName;

                        users[userIndex].email =
                            newEmail;

                        users[userIndex].phone =
                            newPhone;

                        users[userIndex].department =
                            newDepartment;

                        users[userIndex].about =
                            newAbout;


                        saveUsers(users);


                        saveCurrentUser(
                            users[userIndex]
                        );

                    }


                    /* ---------- DISABLE AGAIN ---------- */

                    const allInputs =
                        document.querySelectorAll(
                            ".profile-layout input, " +
                            ".profile-layout textarea"
                        );


                    allInputs.forEach(
                        function(input) {

                            input.disabled = true;

                        }
                    );


                    saveProfile.style.display =
                        "none";


                    editProfile.style.display =
                        "inline-flex";


                    alert(
                        "✓ Profile updated successfully!"
                    );

                }
            );

        }

    }

}


/* =================================
   ADD TASK
================================= */

const addTaskBtn =
    document.getElementById("addTaskBtn");

if (addTaskBtn) {

    addTaskBtn.addEventListener(
        "click",
        function() {

            const taskName =
                prompt(
                    "Enter the name of your new task:"
                );


            if (
                taskName &&
                taskName.trim() !== ""
            ) {

                alert(
                    "✓ Task '" +
                    taskName.trim() +
                    "' has been added successfully!"
                );

            }

        }
    );

}


/* =================================
   LOGOUT LINKS
================================= */

const logoutLinks =
    document.querySelectorAll(
        'a[href="login.html"]'
    );


logoutLinks.forEach(function(link) {

    const linkText =
        link.textContent.trim().toLowerCase();


    if (linkText.includes("logout")) {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                logoutUser();

            }
        );

    }

});



// ===============================
// FORGOT PASSWORD
// ===============================

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
    forgotPassword.addEventListener("click", function (event) {
        event.preventDefault();

        const users = JSON.parse(
            localStorage.getItem("crewdeskUsers") || "[]"
        );

        const email = prompt("Enter your registered Employee email:");

        if (!email) {
            return;
        }

        const user = users.find(
            u => u.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (!user) {
            alert("No account found with this email.");
            return;
        }

        const newPassword = prompt("Enter your new password:");

        if (!newPassword) {
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        user.password = newPassword;

        localStorage.setItem(
            "crewdeskUsers",
            JSON.stringify(users)
        );

        alert("Password changed successfully! Please login with your new password.");
    });
}


const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

if (startDate && endDate) {
    startDate.addEventListener("change", function () {
        endDate.min = this.value;
    });
}

