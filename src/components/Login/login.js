import classes from './login.module.css'


function Login () {
    return <div className={classes.container}>
        <div className={classes.header}></div>
        <div className={classes.loginForm}>
            <form>
                <label>username: </label>
                <input type="text" id="name" ></input>

                <label>Password: </label>
                <input type="password" id="name" ></input>

                <button>Log in </button>

            </form>
        </div>
    </div>
}

export default Login;