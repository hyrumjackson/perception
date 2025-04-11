import { useNavigate } from 'react-router-dom';

const PlayerInfo = () => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h2>Enter Name</h2>
            <input type="text" placeholder="Your name" />
            <br />
            <br />
            <h2>Select Avatar</h2>
            <div>
                <label>
                    <input type="radio" name="avatar" value="avatar1" />
                    🐶
                </label>
                <label>
                    <input type="radio" name="avatar" value="avatar2" />
                    🐱
                </label>
                <label>
                    <input type="radio" name="avatar" value="avatar3" />
                    🐸
                </label>
                <label>
                    <input type="radio" name="avatar" value="avatar4" />
                    🐵
                </label>
                <label>
                    <input type="radio" name="avatar" value="avatar5" />
                    🦊
                </label>
                <label>
                    <input type="radio" name="avatar" value="avatar6" />
                    🐯
                </label>
                <label>
                    <input type="radio" name="avatar" value="avatar7" />
                    🐼
                </label>
                <label>
                    <input type="radio" name="avatar" value="avatar8" />
                    🐧
                </label>
            </div>
            <button onClick={() => navigate('/lobby')}>Join Lobby</button>
        </div>
    );
};

export default PlayerInfo;