import React from "react";
import cn from 'classnames';
import IconButton from "../iconButton/IconButton";
import { Category } from "../button/Button";
import { Form, useNavigate } from "react-router-dom";
// @TODO: Get styles from it's own comp's style
import styles from '../../pages/mainPage/MainPage.module.css';
import HomeButton from "../homeButton/HomeButton";
import TagButton from "../tagButton/TagButton";
import NavigateButton from "../navigateButton/NavigateButton";
import UploadButton from "@/pages/indexPage/UploadButton/UploadButton";
import DownloadButton from "@/pages/indexPage/DownloadButton/DownloadButton";

type Props = {
    dontShowOutlet: boolean;
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
    isSmallScreen: boolean;
}

export const NavigationBar: React.FC<Props> = ({ dontShowOutlet, isExpanded, setIsExpanded, isSmallScreen }) => {
    const navigate = useNavigate();

    return (<div className={cn({ [styles.homeButtons]: !isSmallScreen })}>
        {!dontShowOutlet && (<>
            <IconButton
                category={Category.info}
                icon="bi bi-card-list"
                onClick={() => {
                    navigate('/');
                    setIsExpanded(!isExpanded)
                }}
            />
            <HomeButton />
            <Form method="post" className={styles.newForm}>
                <input type="hidden" name="formId" value="newTask" />
                <IconButton type="submit" icon="bi-plus-square-fill" category={Category.accent} />
            </Form>
            <TagButton />
            <NavigateButton icon={'bi bi-bar-chart-fill'} url={'stats'} style={styles.bar} />
            <UploadButton />
            <DownloadButton />
        </>)}
    </div>)
}