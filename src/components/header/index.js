import { h } from 'preact';
import { Link } from 'preact-router/match';
import { Menu, Icon, Sidebar, Sticky, Container } from 'semantic-ui-react';

const Header = () => (
	<Sticky bottomOffset={100}>
		<Container fluid style={{ background: 'black' }}>
			<Menu inverted>
				<Link activeClassName={'active'} href="/">
					<Menu.Item as="a">
						<Icon name="home" />
                Home
					</Menu.Item>
				</Link>

				<Link activeClassName={'active'} href="/operations">
					<Menu.Item as="a">
						<Icon name="wrench" />
                Opperations
					</Menu.Item>
				</Link>

				<Link activeClassName={'active'} href="/support">
					<Menu.Item as="a">
						<Icon name="users" />
                Support
					</Menu.Item>
				</Link>
			</Menu>
		</Container>
	</Sticky>
);

export default Header;
