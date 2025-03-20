import cheflogo from '../assets/images/Chef Claude Icon.png'; 

export default function Header(){
    return (
        <div className='header'>
            <div className="logo">
                <img src={cheflogo} alt="chef-logo" />
            </div>
            <div className="text">
                Chef Claude
            </div>
        </div>
    )
}