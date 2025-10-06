# Jarvis-extension

## Project Overview

Jarvis, the Voice AI Akash Cloud Manager, is an innovative decentralized application that 
enables users to deploy, monitor, and manage cloud resources on the Akash Network using voice 
commands. Designed to enhance accessibility and streamline interaction with decentralized 
infrastructure.

## Getting Started

To set up and run Jarvis Extension locally, follow these steps:

### Prerequisites

- Node Js: Install for React Typescript and vite (curl https://nodejs.org| npm).
- Cosmos Hub Wallet: Fund a testnet wallet with ATOM (see Akash testnet docs).
- Microphone: Ensure a working microphone for voice input.

### Setup

- Clone the Repository:

```bash
    git clone https://github.com/caramel0019/Jarvis-extension.git
    cd Jarvis-extension
    npm install
```
#### Setup constants

navigate to ``` src/utils/constants.ts  ```
and update the constants to your need or preferences

also 
navigate to ``` src/content/content.ts  ```
update the web base url on line 1 to match jarvis web url

#### Setup manifest.json

navigate to ``` public/manifest.json  ```
and update the the host permissions url to our web page url

### Build the application

```bash
    npm run build
```

## Usage 

To use Jarvis-extension, simply go to chrome after building the application and go the extensions page, on the developer option and click load unpacked then select the dist folder in the project folder.
You can interact with the extension by clicking on the icon, it will direct you to our web page for auth, after auth you can easily navigate in the extension. 

## Features 

- Voice command support for deploying and managing Akash cloud resources.
- ATOM payments for Akash provider services.

## Data Flow

- User speaks a command (e.g., “Deploy a web server with 2GigaByte of RAM and 500GigaByte of Storage”) 
into the microphone via the web UI.
- The frontend sends the audio to the Python backend, where NLP interprets it into an Akash action.
- The backend uses cosmpy or Akash CLI to construct and submit a deployment request, funded with 
ATOM from the user’s wallet.
- Deployment data is saved to PostgreSQL, and the frontend updates with the result.

## How it Leverages Cosmos Technologies

Jarvis integrates with the Cosmos ecosystem through ATOM and Akash, focusing on economic and 
infrastructural benefits rather than direct use of Cosmos development tools:

1. ATOM (Cosmos Hub Token)
- Use Case: Authenticate and funds Akash deployments and facilitates communication with providers.
- Implementation: Jarvis uses an Akash wallet (testnet) to send ATOM payments, processed via the 
Cosmos Hub.
- Benefit: Leverages ATOM’s utility as a payment token, simplifying transactions within the Akash 
ecosystem.

2. Akash Network (Cosmos-Based)
- Use Case: Provides the decentralized cloud platform that Jarvis manages.
- Implementation: Jarvis interfaces with Akash via cosmpy and the Akash CLI, submitting deployments 
and monitoring resources.
- Benefit: Utilizes Akash’s Cosmos-built infrastructure, benefiting from its scalability.

## Future Plans and Roadmap

Jarvis aims to evolve as a voice-driven gateway to decentralized cloud computing, with plans to enhance 
functionality and integration:

### Short-Term (Post-Hackathon, Q2 2025)

- Voice Command Expansion: Support additional Akash operations (e.g., scaling, termination) via voice.
- UI Polish: Improve the web interface with real-time deployment logs and voice feedback.
- Testing: Validate NLP accuracy and ATOM payment reliability on the Akash testnet.

### Medium-Term (Q3-Q4 2025)

- Multi-Cloud Support: Extend voice controls to other decentralized platforms, using ATOM or other Cosmos 
tokens.
- Database Optimization: Add indexing and analytics for deployment history in PostgreSQL.
- Mobile Access: Develop a mobile-friendly UI or app for on-the-go management.

### Long-Term (2026 and Beyond)

- IBC Integration: Explore direct IBC use for cross-chain resource management within Cosmos.
- AI Enhancement: Train a custom NLP model for better voice command recognition in diverse accents.
- Ecosystem Collaboration: Partner with Akash and Cosmos projects to integrate Jarvis into broader 
workflows.

## Technologies Used

* React
* Typescript 
* HTML/Tailwind CSS
* Vite
* npm

### Components:

- Microphone input for capturing voice commands.
- Display for deployment status and resource monitoring.
- Display for payment and history.

## License 

Jarvis-web is released under the MIT License. See LICENSE for details.

## Conclusion

Jarvis redefines decentralized cloud management by introducing voice-driven control, powered by 
ATOM payments and Akash integration. Its use of NLP, cosmpy, and the Akash CLI showcases a 
creative application within the Cosmos ecosystem. We’re excited to refine this project and invite 
the Naija HackATOM community to contribute!

Explore the project at https://github.com/caramel0019/Jarvis-extension.git

