# Elementor Replication Architecture

The WordPress implementation should retain a small number of primary pages—Home, Programme, Theme, Speakers, Experience, Build Tours, Venue, and Register—then use Elementor Theme Builder for the shared header and footer. Elementor Pro is recommended because its Theme Builder manages site-part templates and display conditions; content-heavy sections should use reusable Elementor containers or, where the client needs future editability, a lightweight custom-post-type and ACF structure.

The site should retain the separate AAK registration platform as an external booking destination until AAK provides an approved booking/payment integration. Elementor should therefore build a consistent branded handoff, not a simulated checkout.

