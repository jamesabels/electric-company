import { h, Component } from 'preact';
import { Container, Grid, Header, Icon, Statistic, Card, Feed } from 'semantic-ui-react';

import StatsPanel from '../../components/stats';

import DataManager from '../../logic/data-manager';

const data = new DataManager({ duration: 1 });

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			score: 0
		};
	}

	componentDidMount() {
		data.setData('score', 0);
		let score = data.getData('score');
		setInterval(() => {
			score++;
			data.setData('score', score, 100);
			this.setState({ score });
		}, 10);
	}

	render() {
		return (
			<Container id="opperations" style={{ marginTop: '2rem' }}>
				<Header as="h2" icon textAlign="center" style={{ marginBottom: '5rem' }}>
					<Icon name="home" />
					<Header.Content>Home</Header.Content>
				</Header>
				<Grid columns={1}>
					<Grid.Row>
						<Grid.Column>
							<StatsPanel
								workers={this.props.store.workers}
								customers={this.props.store.customers}
								outages={this.props.store.outages}
								support={this.props.store.support_memebers}
							/>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Card fluid>
							<Card.Content>
								<Card.Header>Recent Activity</Card.Header>
							</Card.Content>
							<Card.Content>
								<Feed>
									<Feed.Event>
										<Feed.Label>
											<Icon name="wrench" />
										</Feed.Label>
										<Feed.Content>
											<Feed.Date content="1 day ago" />
											<Feed.Summary>
								You added <a>Jenny Hess</a> to your <a>coworker</a> group.
											</Feed.Summary>
										</Feed.Content>
									</Feed.Event>

									<Feed.Event>
										<Feed.Label>
											<Icon name="shipping fast" />
										</Feed.Label>
										<Feed.Content>
											<Feed.Date content="3 days ago" />
											<Feed.Summary>
								You added <a>Molly Malone</a> as a friend.
											</Feed.Summary>
										</Feed.Content>
									</Feed.Event>

									<Feed.Event>
										<Feed.Label>
											<Icon name="wrench" />
										</Feed.Label>
										<Feed.Content>
											<Feed.Date content="4 days ago" />
											<Feed.Summary>
								You added <a>Elliot Baker</a> to your <a>musicians</a> group.
											</Feed.Summary>
										</Feed.Content>
									</Feed.Event>
								</Feed>
							</Card.Content>
						</Card>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}
