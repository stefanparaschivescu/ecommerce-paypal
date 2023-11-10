import React, {FC, ReactElement, useEffect} from "react";

import HomePageTheme from "./HomePageTheme/HomePageTheme";

const Home: FC = (): ReactElement => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <HomePageTheme />
            <h2>Welcome to our platform! If you have been redirected here please log in!</h2>
        </div>
    );
};

export default Home;
