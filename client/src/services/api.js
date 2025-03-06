import axios from "axios";
import { LOGIN, REGISTER, CREATE_TODO, GET_ALL_TODOS, DELETE_TODO, MARK_TODO} from "./apiConstants";

export const loginFunc = async (data) => {
  try {
    const response = await axios.post(LOGIN, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('Register failed:', error.response.data);
      return {
        success: false,
        error: error.response.data.message || 'Register failed',
        data: error.response.data
      };
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server'
      };
    } else {
      // Something went wrong in setting up the request
      console.error('Request setup error:', error.message);
      return {
        success: false,
        error: 'Request setup error'
      };
    }
  }
};

export const registerFunc = async (data) => {
  try {
    const response = await axios.post(REGISTER, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('Register failed:', error.response.data);
      return {
        success: false,
        error: error.response.data.message || 'Register failed',
        data: error.response.data
      };
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server'
      };
    } else {
      // Something went wrong in setting up the request
      console.error('Request setup error:', error.message);
      return {
        success: false,
        error: 'Request setup error'
      };
    }
  }
};

export const createTodo = async (data) => {
  try {
    const token = getToken()
    const response = await axios.post(CREATE_TODO, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('Todo Creation Failed', error.response.data);
      return {
        success: false,
        error: error.response.data.message || 'Failed To Create Todo',
        data: error.response.data
      };
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server'
      };
    } else {
      // Something went wrong in setting up the request
      console.error('Request setup error:', error.message);
      return {
        success: false,
        error: 'Request setup error'
      };
    }
  }
}

export const getAllTodos = async () => {
  try {
    const token = getToken()
    const response = await axios.get(GET_ALL_TODOS, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('Failed to fetch todos', error.response.data);
      return {
        success: false,
        error: error.response.data.message || 'Failed to fetch todos',
        data: error.response.data
      };
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server'
      };
    } else {
      // Something went wrong in setting up the request
      console.error('Request setup error:', error.message);
      return {
        success: false,
        error: 'Request setup error'
      };
    }
  }
}


export const deleteTodo = async (data) => {
  try {
    const token = getToken()
    const response = await axios.post(DELETE_TODO,{
      todoId: data
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('Failed to delete todo', error.response.data);
      return {
        success: false,
        error: error.response.data.message || 'Failed to delete todos',
        data: error.response.data
      };
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server'
      };
    } else {
      // Something went wrong in setting up the request
      console.error('Request setup error:', error.message);
      return {
        success: false,
        error: 'Request setup error'
      };
    }
  }
}

export const markTodo = async (data) => {
  try {
    const token = getToken()
    const response = await axios.post(MARK_TODO,{
      todoId: data
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('Failed to mark todo', error.response.data);
      return {
        success: false,
        error: error.response.data.message || 'Failed to mark todos',
        data: error.response.data
      };
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server'
      };
    } else {
      // Something went wrong in setting up the request
      console.error('Request setup error:', error.message);
      return {
        success: false,
        error: 'Request setup error'
      };
    }
  }
}

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user"))
  return token
}

