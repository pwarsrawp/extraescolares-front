import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;

export default {
  state: {
    user: {},
  },
  reducers: {
    editProp(state, payload) {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    },
    SUCCESS(state) {
      return { ...state };
    },
  },
  effects: (dispatch) => ({
    editProperty(prop) {
      console.log(prop);
      dispatch.profile.editProp({ newValue: prop.value, key: prop.key });
    },
    async getUser() {
      const response = await axios.get(`${api_url}/users/${dispatch.user.id}`);
      dispatch.profile.editProp('students', response);
      return response;
    },
  }),
};
