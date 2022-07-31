import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
  // Context
  const { postState: { post }, showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast} = useContext(PostContext);
  // State
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    setUpdatedPost(post)
  }, [post]);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = event => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  }

  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  }

  const onSubmit = async event => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({
      show: true,
      message,
      type: success ? 'success' : 'danger'
    });
  }

  return (
    <Modal show={showUpdatePostModal}>
      <Modal.Header closeButton onHide={closeDialog}>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className='mb-4'>
            <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeUpdatedPostForm} />
            <Form.Text id='title-help' muted>Required</Form.Text>
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Control as='textarea' placeholder='Description' name='description' row={3} required value={description} onChange={onChangeUpdatedPostForm} />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url' value={url} onChange={onChangeUpdatedPostForm} />
          </Form.Group>
          <Form.Group>
            <Form.Control as='select' value={status} name='status' onChange={onChangeUpdatedPostForm}>
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
          <Button variant='primary' type='submit'>Update</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UpdatePostModal
