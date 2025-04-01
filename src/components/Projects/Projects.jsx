import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: "Portfolio Website",
            description: "A personal portfolio website to showcase my skills, projects, and contact information.",
            technologies: ["React", "CSS", "JavaScript"],
            link: "https://github.com/Vaishnavi-Pashikanti/Vaish-Portfolio",
        },
        {
            title: "CampusOpportuna",
            description: "A simple weather application that fetches real-time weather data using an API.",
            technologies: ["React", "CSS", "JavaScript"],
            link: "https://github.com/Vaishnavi-Pashikanti/CampusOpp",
        },
        {
            title: "Visual Question Answering.",
            description: "A task management app to create, update, and delete tasks with a user-friendly interface.",
            technologies: ["python", "Flask", "Machine Learning"],
            link: "https://github.com/Vaishnavi-Pashikanti/CNN-NLP",
        },
    ];

    return (
        <div>
            <h2>My Projects</h2>
            <div>
                {projects.map((project, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p>
                            <strong>Technologies:</strong> {project.technologies.join(", ")}
                        </p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;