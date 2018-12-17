import { h, Component } from 'preact';
import { Icon, Statistic } from 'semantic-ui-react';

export default class StatsPanel extends Component {

	componentDidMount () {}

	render() {
		return (
			<Statistic.Group widths="four">
				<Statistic>
					<Statistic.Value>
						<Icon name="wrench" />&nbsp;
						{this.props.workers}
					</Statistic.Value>
					<Statistic.Label>
						Workers
					</Statistic.Label>
				</Statistic>

				<Statistic>
					<Statistic.Value>
						<Icon name="users" />&nbsp;
						{this.props.customers}
					</Statistic.Value>
					<Statistic.Label>
						Customers
					</Statistic.Label>
				</Statistic>

				<Statistic>
					<Statistic.Value>
						<Icon name="cancel" />&nbsp;
						{this.props.outages}
					</Statistic.Value>
					<Statistic.Label>
						Outages
					</Statistic.Label>
				</Statistic>

				<Statistic>
					<Statistic.Value>
						<Icon name="user circle" />&nbsp;
						{this.props.support}
					</Statistic.Value>
					<Statistic.Label>
						Support Memebers
					</Statistic.Label>
				</Statistic>
			</Statistic.Group>
		);
	}
}