import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { isNullOrUndefined } from 'util';
import { Container, Grid, Menu, Icon, Sidebar } from 'semantic-ui-react';

import Header from './header';
import SidebarMenu from './sidebar';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Operations from '../routes/operations';
import Support from '../routes/support';

import DataManager from '../logic/data-manager';

let data = new DataManager({ duration: 100 });

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	initalizeLocalStorage (stats) {
		stats.forEach(prop => {
			console.log(data.getData(prop.stat));
			if (isNullOrUndefined(data.getData(prop.stat)) || isNaN(data.getData(prop.stat))) {
				console.log('SETTING INITIAL STATE ', prop );
				data.setData(prop.stat, prop.ammount, 5000);
			}
		});
	}

	syncLocalStorage () {
		this.setState({
			workers: data.getData('workers'),
			workers_progress: data.getData('workers_progress'),
			workers_power: data.getData('workers_power'),
			workers_speed: data.getData('workers_speed'),
			
			outages: data.getData('outages'),
			
			customers: data.getData('customers'),
			customer_progress: data.getData('customer_progress'),
			customer_power: data.getData('customer_power'),
			customer_speed: data.getData('customer_speed'),

			support_memebers: data.getData('support_members')
		});
	}

	constructor(props) {
		super(props);
		this.init = [
			{ stat: 'workers', ammount: 200 },
			{ stat: 'workers_progress', ammount: 0 },
			{ stat: 'workers_power', ammount: 1 },
			{ stat: 'workers_speed', ammount: 1000 },
			{ stat: 'outages', ammount: 0 },
			{ stat: 'customers', ammount: 0 },
			{ stat: 'support_members', ammount: 0 }
		];
		this.state = {};
	}

	componentWillMount () {
		this.initalizeLocalStorage(this.init);
	}

	componentDidMount () {
		setInterval( () => this.syncLocalStorage(), 300);
	}


	render() {
		return (
			<div id="app" >
				{/* <SidebarMenu /> */}
				<Header />
				<Grid divided="vertically">
					<Grid.Row columns={1}>
						<Grid.Column	>
							<Container>
								<Router onChange={this.handleRoute}>
									<Home path="/" store={this.state} />
									<Operations path="/operations" store={this.state}  />
									<Support path="/support" store={this.state} />
								</Router>
							</Container>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}
