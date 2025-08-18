import './fey-signup-badge.css';

function FeyBadge() {
    return (<div className='root fey-badge-blur-out'>
        <div className='fey-badge-layer-2 '>
            <div className='fey-badge-slide-from-top'>
                <img
                className='badge-image'
                alt="Fey lanyard"
                width="165"
                height="768"
                decoding="async"
                src="/images/fey-lanyard.jpg"
            />
            </div>
        </div>
    </div>);
}

export default FeyBadge;