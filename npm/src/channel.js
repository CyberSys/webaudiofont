'use strict'
console.log('WebAudioFont Channel v1.01');
function WebAudioFontChannel(audioContext) {
	this.audioContext = audioContext;
	this.bandEqualizer = function (from, frequency) {
		var filter = this.audioContext.createBiquadFilter();
		filter.frequency.value = frequency;
		filter.type = "peaking";
		filter.gain.value = 0;
		filter.Q.value = 1.0;
		from.connect(filter);
		return filter;
	};
	this.input = this.audioContext.createDynamicsCompressor();
	this.input.threshold.value = -3; //-50
	this.input.knee.value = 30; //40
	this.input.ratio.value = 12; //12
	//this.input.reduction.value = -20; //-20
	this.input.attack.value = 0.05; //0
	this.input.release.value = 0.08; //0.25
	this.band32 = this.bandEqualizer(this.input, 32);
	this.band64 = this.bandEqualizer(this.band32, 64);
	this.band128 = this.bandEqualizer(this.band64, 128);
	this.band256 = this.bandEqualizer(this.band128, 256);
	this.band512 = this.bandEqualizer(this.band256, 512);
	this.band1k = this.bandEqualizer(this.band512, 1024);
	this.band2k = this.bandEqualizer(this.band1k, 2048);
	this.band4k = this.bandEqualizer(this.band2k, 4096);
	this.band8k = this.bandEqualizer(this.band4k, 8192);
	this.band16k = this.bandEqualizer(this.band8k, 16384);
	this.output = audioContext.createGain();
	this.band16k.connect(this.output);
	return this;
}
if (typeof module === 'object' && module.exports) {
	module.exports = WebAudioFontChannel;
}
if (typeof window !== 'undefined') {
	window.WebAudioFontChannel = WebAudioFontChannel;
}
