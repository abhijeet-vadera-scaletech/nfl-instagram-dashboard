import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconFacebook, IconInstagramColoured } from '../../shared/icons';
import { API_BASE_URL } from 'shared/constants';
import './style.scss';

export default function Home() {
    const navigate = useNavigate();
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            handleRedirect(hash);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    const handleRedirect = (incomingHash: any) => {
        navigate('/auth', {
            state: {
                token: hash.split('#')[1],
                hash: incomingHash || hash || ""
            },
        });
    };
    return (
        <div className="landing-page-wrapper">
            <p className="brand-logo">NFL FLAG</p>
            <a href={`${API_BASE_URL}/api/v1/auth/instagram/login`} className="login-btn-link">
                <button className="login-btn">
                    <IconFacebook color="white" />
                    Login with Facebook
                </button>
            </a>
            <div className="area">
                <ul className="circles">
                    {[...Array(10)].map((_, index) => (
                        <li key={index}>
                            <IconInstagramColoured scale={10} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
