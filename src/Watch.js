import React, {Component} from 'react';
import shaka from 'shaka-player';

class Watch extends Component{

	constructor(props){
		super(props);

        //Creating reference which will allow access to video player on DOM
		this.videoComponent = React.createRef();

        //Adding reference to event handler functions
		this.onErrorEvent = this.onErrorEvent.bind(this);
		this.onError = this.onError.bind(this);
	}

	onErrorEvent(event) {
	  // Extract the shaka.util.Error object from the event.
	  this.onError(event.detail);
	}

	onError(error) {
	  // Log the error.
	  console.error('Error code', error.code, 'object', error);
	}

    //Initialize your shaka player here
	componentDidMount(){
        //Video URL
		var manifestUri = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

        //Reference to our video component on DOM
		const video = this.videoComponent.current;

        //Initializing our shaka player
		var player = new shaka.Player(video);

		// Listen for error events.
  		player.addEventListener('error', this.onErrorEvent);

  		// Try to load a manifest.
	  	// This is an asynchronous process.
	  	player.load(manifestUri).then(function() {
		    // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
            video.requestFullscreen().catch(err => {
                console.log(err)
              });
	  	}).catch(this.onError);  // onError is executed if the asynchronous load fails.
	}

	render(){
        /*Returning video component. Shaka player will be added to this component
            once its mounted on DOM
        */
		return(
				<video 
					width="640"
					ref={this.videoComponent}
                    controls
                    autoPlay
				/>
		);
	}
}

export default Watch;