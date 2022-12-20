import React from 'react';
import './Today.css';
function Today() {
    return (
        <section className='today-section'>
            <input className="input-task" type="text" placeholder='Start typing a new task here' />
            <div className='ToDo-list'>
                <div className="task-description">
                    <div className="task-title">1. task one</div>
                    <div className="task-deadline">01.01.2022</div>
                </div>
                <div className="task-description">
                    <div className="task-title">2. task two</div>
                    <div className="task-deadline">01.01.2022</div>
                </div>
                <div className="task-description">
                    <div className="task-title">3. task three</div>
                    <div className="task-deadline">01.01.2022</div>
                </div>
            </div>
        </section>
    )
}

export default Today
