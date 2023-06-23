import React from 'react';

function PhonePopup() {
    const exampleLevels = [
        {
            title: 'Very Easy Level',
            link: 'https://calcit.pro/C3Se1',
            description: '',
        },
        {
            title: 'Easy Level',
            link: 'https://calcit.pro/h7uA2',
            description: '',
        },
        {
            title: 'Medium Level',
            link: 'https://calcit.pro/MXmrf',
            description: '',
        },
        {
            title: 'Hard Level',
            link: 'https://calcit.pro/l5kGH',
            description: '',
        },
        {
            title: 'Very Hard Level',
            link: 'https://calcit.pro/GGc2i',
            description: '',
        },
    ]

    return (
        <div className="popup-container phone-popup">
            <div className="popup">
                <h1>Unsupported Device</h1>
                <p>You can only create levels using a computer. However, you can still play existing levels on your phone. Please use a desktop or laptop to access the level builder.</p>
                <div className="link-container">
                    <h2>Example Levels:</h2>
                    <ul>
                        {exampleLevels.map((level, index) => (
                            <li key={index}>
                                <a href={level.link}>{level.title}</a> {level.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PhonePopup;
