import { h, Component } from 'preact';
import { Grid, Header, Progress, Segment, Button, List, Icon } from 'semantic-ui-react';
import DataManager from '../../logic/data-manager';
import { isNullOrUndefined } from 'util';

const data = new DataManager({ duration: 1 });

export default class Job extends Component {
    
	calculateProgress (min, max, current) {
		return ((current - min) * 100) / (max - min);
	}
    
	canAfford (total, cost) {
		console.log(total, cost);
		if (total >= cost) {
			return false;
		}
		return true;
	}

	applyUpgrade (upgrade) {
		const cost = upgrade.cost;
		const upgradeAmmount = upgrade.ammount;

		const currentTotal = parseInt(this.props.statTotal);
		const currentAmmount = parseInt(data.getData(`${this.props.stat}_${upgrade.stat}`));

		console.log('APPLYING UPGRADE', currentAmmount + upgradeAmmount);

		data.setData(`${this.props.stat}`, currentTotal - cost, this.props.duration);

		switch (upgrade.mode) {
			case '+': data.setData(`${this.props.stat}_${upgrade.stat}`, currentAmmount + upgradeAmmount, this.props.duration); break;
			case '-': data.setData(`${this.props.stat}_${upgrade.stat}`, currentAmmount - upgradeAmmount, this.props.duration); break;
			case '*': data.setData(`${this.props.stat}_${upgrade.stat}`, currentAmmount + 1 * upgradeAmmount, this.props.duration); break;
			default: data.setData(`${this.props.stat}_${upgrade.stat}`, currentAmmount + upgradeAmmount, this.props.duration); break;
		}

		location.reload();
	}

	doJob (automated, speed) {
		let progress = this.props.progress;
		console.log(this.props.speed);
		if (!isNullOrUndefined(this.props.speed) && !isNaN(this.props.speed)) {
			this.timer = window.setInterval(() => {
				if (!isNullOrUndefined(this.props.statTotal) && !isNaN(this.props.statTotal)) {
					if (progress < this.props.max) {
						progress++;
						this.setState({ in_progress: true });
						data.setData(`${this.props.stat}_in_progress`, true, this.props.duration);
						data.setData(`${this.props.stat}_progress`, progress, this.props.duration);
					}
					else {
						progress = 0;
						this.setState({ in_progress: false });
	
						const stat = parseInt(this.props.statTotal);
						const power = parseInt(this.props.power);
		
						data.setData(`${this.props.stat}_progress`, progress, this.props.duration);
						data.setData(`${this.props.stat}_in_progress`, false, this.props.duration);
	
						if (!this.state.in_progress) {
							switch (this.props.mode) {
								case '+': data.setData(`${this.props.stat}`, stat + power, this.props.duration); break;
								case '-': data.setData(`${this.props.stat}`, stat - power, this.props.duration); break;
								case '*': data.setData(`${this.props.stat}`, stat + 1 * power, this.props.duration); break;
								default: data.setData(`${this.props.stat}`, stat + power, this.props.duration); break;
							}
						}
					
						if (!automated) {
							data.setData(`${this.props.stat}_progress`, 0);
							clearInterval(this.timer);
						}
					}
			
				}
			}, parseInt(this.props.speed));
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			toggleUprades: true,
			in_progress: false
		};
	}

	componentDidMount () {
		if (this.props.automated) {
			setTimeout(() => {
				this.doJob(true, this.props.speed);
			}, 500);
		}
	}

	componentWillUnmount () {
		// clearInterval(this.timer);
	}

	renderUpgrades (toggleUprades, upgrades, totalCurrency) {
		if (toggleUprades) {
			return upgrades.map(upgrade => (
				<List.Item>
					<List.Content floated="right">
						<Button
							disabled={this.canAfford(totalCurrency, upgrade.cost)}
							onClick={() => this.applyUpgrade(upgrade)}
						>
							{upgrade.cost}
						</Button>
					</List.Content>
					<Icon name={upgrade.icon} />
					<List.Content>{upgrade.name}</List.Content>
				</List.Item>
			));
		}
	}
    
	render() {
		return (
			<Grid divided="vertically">
				<Grid.Row columns={1}>
					<Grid.Column	>
						<Segment size="large">
							<Header
								as="h2"
								content={this.props.title}
								subheader={`${this.props.progress}/${this.props.max}`}
							/>
							<Progress percent={this.calculateProgress(this.props.min, this.props.max, this.props.progress )} indicating />
							<List>
								{this.renderUpgrades(this.state.toggleUprades, this.props.upgrades, this.props.statTotal)}
							</List>
							<Button.Group widths="5">
								<Button
									disabled={this.props.automated || this.state.in_progress}
									onClick={() => this.doJob(false)}
								>
									{this.props.verb}
								</Button>
								<Button
									onClick={() => this.setState({
										toggleUprades: !this.state.toggleUprades
									})}
								>
                                    Upgrade
								</Button>
							</Button.Group>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
