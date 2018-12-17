import { h, Component } from 'preact';
import { Container, Grid, Header, Icon, Card, Image, Button, Rail, Segment, Feed } from 'semantic-ui-react';
import DataManager from '../../logic/data-manager';

const data = new DataManager({ duration: 1 });

const coulmnStyle = { marginBottom: '3rem' };

export default class Support extends Component {

	addToQueue (customer, index) {
		if (customer) {
			let customers = [...this.state.customers];
			let queue = [...this.state.queue];
			queue.concat(customer);
            
			let current = customers.indexOf(current);
			customers.splice(customer, 1);
            
			if (index + 1 >= this.state.customers.length) {
				this.setState({ queue: queue.concat(customer), customers: null, currentCustomer: null });
			}
			else {
				this.setState({ queue: queue.concat(customer), customers, currentCustomer: index });
			}
		}
		else {
			this.setState({ customers: null, currentCustomer: null });
		}
	}
    
	addToEmergencies (customer, index) {
		if (customer) {
			let customers = [...this.state.customers];
			let emergencies = [...this.state.emergencies];
			emergencies.concat(customer);
            
			let current = customers.indexOf(current);
			customers.splice(customer, 1);
            
			if (index + 1 >= this.state.customers.length) {
				this.setState({ emergencies: emergencies.concat(customer), customers: null, currentCustomer: null });
			}
			else {
				this.setState({ emergencies: emergencies.concat(customer), customers, currentCustomer: index });
			}
		}
		else {
			this.setState({ customers: null, currentCustomer: null });
		}
	}
    
	hangUp (customer) {
		if (customer) {
			let customers = [...this.state.customers];
            
			let current = customers.indexOf(current);
			customers.splice(customer, 1);
            
			this.setState({ customers });
		}
		else {
			this.setState({ customers: null, currentCustomer: null });
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			currentCustomer: 0,
			customers: [
				{
					image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
					name: 'Mathew',
					address: '134 Maple St',
					problem: 'My power is out!'
				},
				{
					image: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
					name: 'Elliot',
					address: '134 Maple St',
					problem: 'My power is out!'
				},
				{
					image: 'https://react.semantic-ui.com/images/avatar/large/joe.jpg',
					name: 'Joe',
					address: '134 Maple St',
					problem: 'My power is out!'
				}
			],
			queue: [],
			emergencies: [],
			score: 0
		};
		this.addToQueue = this.addToQueue.bind(this);
	}
    
	renderColumn (customers) {
		let customer;
		if (customer === null || this.state.currentCustomer === null || customers.length === 0) {
			return <h1>No More</h1>;
		}
        
		customer = customers[this.state.currentCustomer];
		return (
			<Grid.Column style={coulmnStyle}>
				<Card>
					<Image src={customer.image} />
					<Card.Content>
						<Card.Header>{customer.name}</Card.Header>
						<Card.Meta>
							<span className="date">{customer.address}</span>
						</Card.Meta>
						<Card.Description>{customer.problem}</Card.Description>
					</Card.Content>
					<Card.Content extra >
						<Button.Group widths={5}>
							<Button
								animated="vertical"
								primary
								onClick={() => this.addToQueue(customer, this.state.currentCustomer)}
							>
								<Button.Content hidden>Queue</Button.Content>
								<Button.Content visible>
									<Icon name="bolt" />
								</Button.Content>
							</Button>
							<Button
								animated="vertical"
								color={'green'}
								onClick={() => this.addToEmergencies(customer, this.state.currentCustomer)}
							>
								<Button.Content hidden>Now</Button.Content>
								<Button.Content visible>
									<Icon name="shipping fast" />
								</Button.Content>
							</Button>
							<Button
								animated="vertical"
								color={'red'}
								onClick={() => this.hangUp(customer, this.state.currentCustomer)}
							>
								<Button.Content hidden>End</Button.Content>
								<Button.Content visible>
									<Icon name="phone" />
								</Button.Content>
							</Button>
						</Button.Group>
					</Card.Content>
				</Card>
			</Grid.Column>
		);
	}

	renderQueue (queue) {
		return queue.map(customer => (
			<Feed.Event style={{ marginBottom: '0.5rem' }}>
				<Feed.Label>
					<Icon name="bolt" />
				</Feed.Label>
				<Feed.Content>
					<Feed.Summary>
						<Feed.User>{customer.name}</Feed.User>
						<Feed.Date>1 Hour Ago</Feed.Date>
					</Feed.Summary>
				</Feed.Content>
			</Feed.Event>
		));
	}
    
	renderEmergencies (queue) {
		return queue.map(customer => (
			<Feed.Event style={{ marginBottom: '0.5rem' }}>
				<Feed.Label>
					<Icon name="shipping fast" />
				</Feed.Label>
				<Feed.Content>
					<Feed.Summary>
						<Feed.User>{customer.name}</Feed.User>
						<Feed.Date>1 Hour Ago</Feed.Date>
					</Feed.Summary>
				</Feed.Content>
			</Feed.Event>
		));
	}

	render() {
		return (
			<Container id="support" fluid style={{ marginTop: '2rem' }}>
				<Header as="h2" icon textAlign="center" style={{ marginBottom: '5rem' }}>
					<Icon name="users" />
					<Header.Content>Support</Header.Content>
				</Header>
				<Grid columns={4} centered>
					<Grid.Row>

						<Rail internal position="left">
							<Segment>
								<Header size="medium">Queue</Header>
								<Feed style={{ marginTop: '1rem' }}>
									{this.renderQueue(this.state.queue)}
								</Feed>
							</Segment>
						</Rail>
                    
						{this.renderColumn(this.state.customers)}

						<Rail internal position="right">
							<Segment>
								<Header size="medium">Emergencies</Header>
								<Feed style={{ marginTop: '1rem' }}>
									{this.renderEmergencies(this.state.emergencies)}
								</Feed>
							</Segment>
						</Rail>

					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}
