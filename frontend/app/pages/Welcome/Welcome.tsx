import style from './welcome.module.scss';

const Welcome = () => {
  return (
    <div className={style.welcomeContainer}>
      <h1>Your search for the next dream job is over 🚀</h1>
      <div>
        <button>Start Searching</button>
      </div>
      <br />
      <div className={style.inputContainer}>
        <div className={style.inputInstance}>
          <input
            type="text"
            placeholder="Search for a job"
            className="input-area"
          />
        </div>
        <br />
        <div className={style.inputInstance}>
          <textarea placeholder="Search for a job" className="input-area" />
        </div>
      </div>
      <img src="./assets/root-logos.png" alt="root logos" />
    </div>
  );
};

export default Welcome;
