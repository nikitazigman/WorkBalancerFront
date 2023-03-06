const Config = {
    base_url: "http://localhost:8000",
    links: {
        sign_in: "/sign-in",
        sign_up: "/sign-up",
        home: "/",
        today: "/today",
        backlog: "/backlog",
        history: "/history",
    },
    api: {
        sign_in: "/api/v1/auth/login/",
        sign_up: "/api/v1/auth/registration/",
        logout: "/api/v1/auth/logout/",
        user: "/api/v1/auth/user/",
        tasks: "/api/v1/tasks/",
        backlog_tasks: "/api/v1/tasks/?completed=false",
        days: "/api/v1/days/",
        refresh_token: "/api/v1/auth/token/refresh/",
    }
}

export default Config;