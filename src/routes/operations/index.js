import { h, Component } from 'preact';
import { Container, Grid, Header, Icon, List, Progress, Segment, Button } from 'semantic-ui-react';
import DataManager from '../../logic/data-manager';

import Job from '../../components/job';
import StatsPanel from '../../components/stats';

const data = new DataManager({ duration: 1 });

export default class Operations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			toggleUprades: false,
			progress: 0,
			upgrades: [
				{
					icon: 'wrench',
					name: 'Upgrade Workers',
					mode: '+',
					cost: 100,
					stat: 'power',
					ammount: 100
				},
				{
					icon: 'wrench',
					name: 'Upgrade Speed',
					mode: '-',
					cost: 100,
					stat: 'speed',
					ammount: 10
				}
			]
		};
	}

	componentDidMount() {}

	render() {
		return (
			<Container id="opperations" style={{ marginTop: '2rem' }}>
				<Header as="h2" icon textAlign="center" style={{ marginBottom: '5rem' }}>
					<Icon name="wrench" />
					<Header.Content>Operations</Header.Content>
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
							<Job
								automated
								duration={7}
								title={'Workers'}
								verb={'Hire'}
								stat={'workers'}
								mode={'+'}
								statTotal={this.props.store.workers}
								upgrades={this.state.upgrades}
								min={0}
								max={100}
								progress={this.props.store.workers_progress}
								power={this.props.store.workers_power}
								speed={this.props.store.workers_speed}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}
