import React, { useState } from 'react';
import useAxiosSecure from '../AllUsers/useAxiosSecure';
import Swal from 'sweetalert2';

const Feedback = () => {
  const [axiosSecure] = useAxiosSecure();
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    axiosSecure
      .patch(`/courses/feedback/${feedback._id}`, {
        status: 'rejected', // You can update the status as needed
        feedback: feedback,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Feedback updated',
            showConfirmButton: false,
            timer: 1500,
          });
          setFeedback('');
        }
      })
      .catch((err) => {
        console.error('Feedback Error:', err);
      });
  };

  return (
    <div className='flex flex-col'>
      <input
        type='text'
        name='feedback'
        placeholder='Feedback'
        className='input input-bordered h-52 p-20 mx-20'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={handleFeedbackSubmit} className='my-5 btn btn-primary mx-20' type='button'>
        Submit
      </button>
    </div>
  );
};

export default Feedback;
