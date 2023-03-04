import React from 'react';
import { Link } from "react-router-dom";

import githubIcon from "../../../imgs/github_icon.svg"
import figmaIcon from "../../../imgs/figma_icon.svg"
import telegramIcon from "../../../imgs/telegram_icon.png"
import emailIcon from "../../../imgs/email_icon.svg"
import authorPhoto from "../../../imgs/author_photo.png"
import landingImage from "../../../imgs/landing_image.svg"
import backlogScreen from "../../../imgs/backlog_example_image.png"

import config from "../../../configs/config"


import "./Landing.css"


function Landing() {
    const handleSignUp = (event) => {

    }

    return (
        <section className='landing-section'>
            <section className='greeting-section'>
                <div className="greeting-container">
                    <h1 className="greeting-title">
                        Yet another <br />
                        <span className='ToDo'> ToDo </span>
                        <span className='app'>app</span>
                        lication.
                    </h1>
                    <div className="greeting-description">
                        WorkBalancer is all about finding your perfect
                        work-life balance. <span>Set </span>your tasks for today, <span>do </span>
                        what you can, and <span>adjust </span>your workload for tomorrow.
                        It's that simple!
                    </div>
                    <button className='SingUp-btn' onClick={handleSignUp}>Sign Up</button>
                </div>
                <img className='greeting-img' src={landingImage} alt="task form" />
            </section>

            <section id='project-section' className='project-section'>
                <div className="project-container">
                    <div className="cards-container">
                        <div className="card">
                            <div className="card-title">No cost to user</div>
                            <div className="card-text">
                                The WorkBalancer was designed not for profit,
                                but for the sheer joy of creating a tool that helps people
                                find balance and happiness in their lives.
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title">Open source</div>
                            <div className="card-text">
                                Created by a single coder with a passion for open source.
                                Follow the links below to discover the source code and design.
                            </div>
                            <div className="card-links">
                                <div className="links-container">
                                    <img src={githubIcon} alt="github" />
                                    <a
                                        href="https://github.com/nikitazigman/WorkBalancer"
                                        className="text"
                                    >
                                        GitHub
                                    </a>
                                </div>
                                <div className="links-container">
                                    <img src={figmaIcon} alt="github" />
                                    <a href="https://www.figma.com/file/TO9UUFGr9VGc1C7uHi4nl8/WorkBalancer?node-id=603%3A1030&t=MS75bWpvvWZipAz7-0"
                                        className="text"
                                    >
                                        Figma
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title">Easy to use</div>
                            <div className="card-text">
                                The WorkBalancer keeps things simple
                                by focusing only on what's necessary.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='project-section'>
                <div className="project-container">
                    <div className="cards-container">
                        <img className="author-photo" src={authorPhoto} alt="project author" />
                        <div className="author-card">
                            <div className="card-title">Hey, fellows!</div>
                            <div className="card-text">
                                The WorkBalancer was born out of my own need
                                for a better way to manage my daily tasks.
                                What started as a simple notepad routine is now a
                                fun and easy-to-use web app. Come check it out and
                                let's work together to make it even better!
                            </div>
                            <div className="card-links">
                                <div className="links-container">
                                    <img src={telegramIcon} alt="github" />
                                    <a className="text">Telegram</a>
                                </div>
                                <div className="links-container">
                                    <img src={emailIcon} alt="github" />
                                    <a
                                        className="text">zigman.nikita.tech@gmail.com
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </section >
    )
}

export default Landing
