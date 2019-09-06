import React from "react";
import {SoundCache, Sound} from "../../sounds";
import Measure from "../Measure";
import Themes from "../../Theme";
import TrackController from "../TrackController";
import "./style.scss"

interface Props {
  soundCache: SoundCache,
  isCurrentlyPlaying: boolean,
  sound: Sound,
  amtMeasures: number,
  beatsPerMeasure: number,
  trackIndex: number,
  removeTrack: ()=>void,
  changeTrack: (track: Sound)=>void
}

interface State {
  currentPlayingIndex: number
}

export default class Track extends React.Component<Props, State>{
  static contextType = Themes.Context;
  constructor(props: Props) {
    super(props);
    this.state = { currentPlayingIndex: 0 };
  }

  private getMeasures() {
    const arr = [];
    for (let i = 0; i < this.props.amtMeasures; i++) {
      arr.push((
        <Measure amtBeats={this.props.beatsPerMeasure} key={i} index={i} noteIndex={this.state.currentPlayingIndex/4==i+1 ? this.state.currentPlayingIndex%4 : 0} />
      ));
    }
    return arr;
  }
  render() {
    return (
      <div className="track" style={{
        gridRowStart: this.props.trackIndex,
        gridRowEnd: this.props.trackIndex + 1,
        gridColumnStart: 1,
        gridColumnEnd: this.props.amtMeasures,
        border: this.context.trackBorder
      }}>
      <TrackController
      soundName={this.props.sound.sound}
      changeTrack={this.props.changeTrack}
      removeTrack={this.props.removeTrack}
      />
        {this.getMeasures()}
      </div>
    )
  }
}
