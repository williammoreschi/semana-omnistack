import React, { Component } from 'react';
import './New.css';
import api from '../services/api';

class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description:'',
        hashtags:''
    };

    handleImageChange = e =>{
        this.setState({image: e.target.files[0]});
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async e =>{
        e.preventDefault();
        
        const data = new FormData();
        
        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await  api.post('posts', data);

        this.props.history.push('/');
    }

    render() {
        return (
            <form id='new-post' onSubmit={this.handleSubmit}>
                <input type='file' onChange={this.handleImageChange}></input>

                <input
                    type='text'
                    name='author'
                    placeholder='auto do post'
                    onChange={this.handleChange}
                    value={this.state.author}
                ></input>

                <input
                    type='text'
                    name='place'
                    placeholder='local do post'
                    onChange={this.handleChange}
                    value={this.state.place}
                ></input>

                <input 
                    type='text'
                    name='description'
                    placeholder='descrição do post'
                    onChange={this.handleChange}
                    value={this.state.description}     
                ></input>

                <input
                    type='text'
                    name='hashtags'
                    placeholder='hashtags do post'
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                ></input>
                <button type='submit'>Enviar</button>
            </form>
        );
    }
}

export default New;