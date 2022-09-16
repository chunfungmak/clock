import './FastForward.css'

export function FastForward({forward}: {forward: boolean}) {
    return <div className="upper-container">
        <div className={`fastforward ${forward? '': 'rotate'}`}>
            <div className="arrow"></div>
            <div className="arrow"></div>
            <div className="arrow"></div>
        </div>
    </div>
}
