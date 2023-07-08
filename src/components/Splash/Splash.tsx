import Styles from './css/Splash.module.css';

export const MapSplash = () => {
  return (
      <div className={Styles.splashContainer}>
        <div className={Styles.splash}>
          <img src={`${process.env.PUBLIC_URL}/assets/img/common/splash_map.svg`} alt="" />
        </div>
      </div>
  );
}