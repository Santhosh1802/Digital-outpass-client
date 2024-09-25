import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';

const FirstEditStudentProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get username and email from location state
    const { email, username } = location.state || {};

    // Initialize form state with username and email
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        department: '',
        parent_name: '',
        parent_mobile: '',
        guardian_name: '',
        guardian_mobile: '',
        home_addr: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            name: username || '',
            email: email || '',
        }));
    }, [email, username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res=await axios.post(process.env.REACT_APP_NEW_PROFILE_API, formData);
            console.log(res.data);
            setSuccess(true);
            setError('')
    
            

            navigate('/studentdashboard', { state: { email,username } });
        } catch (err) {
            setError('Failed to update profile');
            setSuccess(false);
            console.error(err);
        }
    };

    return (
        <Container className="firstedit">
            <h2 className="text-center">Update Your Profile</h2>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Username</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.name}
                        onChange={handleChange}
                        readOnly
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Email</InputGroup.Text>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Mobile</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Department</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Parent Name</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="parent_name"
                        value={formData.parent_name}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Parent Mobile</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="parent_mobile"
                        value={formData.parent_mobile}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Guardian Name</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="guardian_name"
                        value={formData.guardian_name}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Guardian Mobile</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="guardian_mobile"
                        value={formData.guardian_mobile}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className='equal-text1'>Home Address</InputGroup.Text>
                    <Form.Control
                        as="textarea"
                        name="home_addr"
                        value={formData.home_addr}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Profile updated successfully!</p>}

                <Button variant="primary" type="submit" className="mt-3">
                    Save Profile
                </Button>
            </Form>
        </Container>
    );
};

export default FirstEditStudentProfile;
