import './auth.css';

const Auth = () => {
    return ( 
        <div className="auth">
            <h1>Authentification</h1>
            <form>
                <label>Username:</label>
                <input type="text" required />
                <label>Password:</label>
                <input type="password" required />
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default Auth;