ReachAlbert.constants = {
	mainTabs:[{
		id: 0,
		name:'Home',
		icon: 'home',
		state: 'home.welcome'
	},{
		id: 1,
		name:'Applications',
		icon: 'apps',
		state: 'apps.details',
	},{
		id: 2,
		name:'Get in Touch',
		icon: 'contacts',
		state: 'contact'
	}],
	albert: {
		teach: {
			types: [{
				key: 'CONVO',
				name: 'Conversations'
			},{
				key: 'QN',
				name: 'Questions'
			},{
				key: 'CMD',
				name: 'Commands'
			}],
			actions: [{
				key: 'NONE',
				name: 'None',
				param_1: 'User\'s Question',
				param_2: 'Albert\'s Response'
			},{
				key: 'LINK',
				name: 'Link Responses',
				param_1: 'Parent Response',
				param_2: 'New Response'
			},{
				key: 'CUSTOM',
				name: 'Custom Action',
				param_1: 'Param 1',
				param_2: 'Param 2'
			}]
		}
	}
}