import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Menu, Icon, Sidebar } from 'semantic-ui-react';

const SidebarMenu = () => (
	<Sidebar
		as={Menu}
		animation="overlay"
		icon="labeled"
		inverted
		vertical
		visible
		width="thin"
	>
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
	</Sidebar>
);

export default SidebarMenu;