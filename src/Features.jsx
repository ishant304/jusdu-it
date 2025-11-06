import { faAlarmClock, faCalendarPlus, faCalendarXmark, faFilter, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Features() {
    return (
        <div>
            <div id="features" class="features-section">
                <div class="section-header">
                    <h2>Features</h2>
                    <p>Everything you need to organize your tasks and boost your productivity</p>
                </div>

                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon"><FontAwesomeIcon icon={faCalendarPlus} /></div>
                        <h3>Quick Task Creation</h3>
                        <p>Add new tasks instantly with our intuitive interface. Simply type and hit enter to create tasks in seconds.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon"><FontAwesomeIcon icon={faTrash} /></div>
                        <h3>Delete Tasks</h3>
                        <p>Remove completed or unwanted tasks effortlessly. Keep your list clean and focused on what matters most.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon"><FontAwesomeIcon icon={faAlarmClock} /></div>
                        <h3>Time Tracking</h3>
                        <p>Track when tasks were created and monitor your productivity. Stay aware of how long tasks have been pending.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon"><FontAwesomeIcon icon={faCalendarXmark} /></div>
                        <h3>Deadline Management</h3>
                        <p>Set deadlines for your tasks and never miss important dates. Get visual reminders as deadlines approach.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon"><FontAwesomeIcon icon={faSquareCheck} /></div>
                        <h3>Mark as Complete</h3>
                        <p>Check off completed tasks with satisfaction. View your progress and celebrate your accomplishments.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon"><FontAwesomeIcon icon={faFilter} /></div>
                        <h3>Task Organization</h3>
                        <p>Filter and sort tasks by status, priority, or deadline. Find what you need exactly when you need it.</p>
                    </div>
                </div>
            </div>
            <div className="seprator"></div>

        </div>
    )
}