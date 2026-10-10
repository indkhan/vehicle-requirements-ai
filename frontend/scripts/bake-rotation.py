"""Bake optical-flow in-between views from BMW's 36 official angles.
Run manually with Python, Pillow, numpy and opencv-python-headless.
No runtime dependency; the frontend serves the resulting local WebP frames.
"""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1]/'public/images/bmw'
cv2.setNumThreads(4)
for family in ('f70','g60','g68','g70'):
    source=root/'rotation'/family
    output=root/'spin'/family
    output.mkdir(parents=True,exist_ok=True)
    frames=[]
    for i in range(36):
        im=Image.open(source/f'{i:02d}.webp').convert('RGBA')
        im.thumbnail((960,540),Image.Resampling.LANCZOS)
        frames.append(np.array(im))
    h,w=frames[0].shape[:2]
    grid=np.stack(np.meshgrid(np.arange(w),np.arange(h)),axis=-1).astype(np.float32)
    flow=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
    for i,a in enumerate(frames):
        b=frames[(i+1)%36]
        ag=cv2.cvtColor(a[:,:,:3],cv2.COLOR_RGB2GRAY); bg=cv2.cvtColor(b[:,:,:3],cv2.COLOR_RGB2GRAY)
        forward=flow.calc(ag,bg,None); backward=flow.calc(bg,ag,None)
        for step in range(4):
            t=step/4
            if step==0: result=a
            else:
                ma=grid-t*forward; mb=grid-(1-t)*backward
                wa=cv2.remap(a,ma[:,:,0],ma[:,:,1],cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
                wb=cv2.remap(b,mb[:,:,0],mb[:,:,1],cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
                blended=cv2.addWeighted(wa,1-t,wb,t,0)
                # Occlusions around mirrors/wheels cannot be interpolated reliably.
                # Reject inconsistent flow there instead of producing detached shapes.
                check_a=cv2.remap(backward,(grid+forward)[:,:,0],(grid+forward)[:,:,1],cv2.INTER_LINEAR)
                check_b=cv2.remap(forward,(grid+backward)[:,:,0],(grid+backward)[:,:,1],cv2.INTER_LINEAR)
                reliable_a=(np.linalg.norm(forward+check_a,axis=2)<1.5).astype(np.float32)
                reliable_b=(np.linalg.norm(backward+check_b,axis=2)<1.5).astype(np.float32)
                ca=cv2.remap(reliable_a,ma[:,:,0],ma[:,:,1],cv2.INTER_LINEAR)
                cb=cv2.remap(reliable_b,mb[:,:,0],mb[:,:,1],cv2.INTER_LINEAR)
                confidence=cv2.GaussianBlur(np.minimum(ca,cb),(5,5),0)[:,:,None]
                nearest=a if t<.5 else b
                result=np.clip(blended*confidence+nearest*(1-confidence),0,255).astype(np.uint8)
            if family!='g68':
                yy,xx=np.mgrid[0:h,0:w]
                edge=np.minimum.reduce([xx/(w*.08),(w-1-xx)/(w*.08),yy/(h*.15),(h-1-yy)/(h*.08)])
                edge=np.clip(edge,0,1);edge=edge*edge*(3-2*edge)
                result=result.copy();result[:,:,3]=(result[:,:,3]*edge).astype(np.uint8)
            Image.fromarray(result).save(output/f'{i*4+step:03d}.webp',quality=83,method=4)
    print(family,144,'frames',flush=True)
