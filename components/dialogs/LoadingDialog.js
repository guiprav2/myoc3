import d from '../../other/dominant.js';

class LoadingDialog {
  constructor(props) {
    this.props = props;
    d.effect(() => this.done, x => x && this.root.close());
  }

  get done() { return d.resolve(this.props.done) }

  render = () => this.root = d.html`
    <dialog class="flex flex-col p-0 rounded text-sm text-white bg-[#262626] shadow-xl outline-none">
      <div class="p-3">
        <div class="nf nf-fae-spin_double spinning w-min mx-auto font-7xl"></div>
      </div>
    </dialog>
  `;
}

export default LoadingDialog;
