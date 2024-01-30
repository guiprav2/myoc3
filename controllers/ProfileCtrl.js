class ProfileCtrl {
  state = {
    name: 'Pengin Pina',
    avatar: 'https://cdn.donmai.us/sample/bd/ae/__pengin_pina_prism_project_drawn_by_pengy_time__sample-bdaee6fbaecea1fc18622740dce0c390.jpg',
    story: 'Text...',

    bio: {
      'Age': '18',
      'Place of birth': 'Virginia',
    },

    physical: null,

    gallery: [
      'https://cdn.donmai.us/sample/f5/15/__pengin_pina_prism_project_drawn_by_jd_benefield__sample-f515576192af61bade21408105ff7973.jpg',
      'https://cdn.donmai.us/sample/2a/57/__pengin_pina_and_broguin_prism_project_drawn_by_rinotuna__sample-2a579d1638866baedf62a32cc709b04f.jpg',
      'https://cdn.donmai.us/sample/bb/78/__pengin_pina_prism_project_drawn_by_xrez__sample-bb7840672281b21aa24cc328a288c5f6.jpg',
      'https://cdn.donmai.us/sample/24/96/__captain_dhole_meerkat_and_pengin_pina_kemono_friends_and_2_more_drawn_by_hasu_zatsugami__sample-249672f64c7cf29265690b9f7e3b6381.jpg',
    ],
  };

  actions = {
    createBio: () => {
      this.state.bio = {
        'Age': '',
        'Place of birth': '',
      };
    },

    createPhysical: () => {
      this.state.physical = {
        'Species': '',
        'Eye color': '',
      };
    },
  };
}

export default ProfileCtrl;
