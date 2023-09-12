import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function Logo({ disabledLink = false, sx }) {
    const theme = useTheme();
    const PRIMARY_LIGHT = theme.palette.primary.light;
    const PRIMARY_MAIN = theme.palette.primary.main;
    const PRIMARY_DARK = theme.palette.primary.dark;

    const logo2 = (
        <Box sx={{ width: 40, height: 40, ...sx }}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 116.48448 56.581238"
                version="1.1"
                id="svg5"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs
                    id="defs2" />
                <g
                    id="layer1"
                    transform="translate(-48.69896,-169.26893)">
                    <path
                        fill="#259764" stroke="none" strokeWidth="0.15512"
                        d="m 61.1462,180.11727 h 0.156265 l 2.343961,-3.6956 c -1.916579,3.5484 -3.845034,6.75695 -3.747994,10.93284 0.02172,0.93483 0.0361,3.06566 0.778976,3.69561 -0.257054,-1.96114 -0.711939,-3.85083 -0.421913,-5.85138 0.3455,-2.38244 1.510605,-4.31139 2.453346,-6.46732 h 0.156264 c -1.015872,2.40446 -2.061592,4.59872 -2.317396,7.23723 -0.553175,5.70495 2.976362,11.85675 6.668414,16.01431 1.003684,1.13024 1.844541,3.27923 3.149658,4.00357 l -4.687922,-7.08325 0.468792,0.30797 c -0.09517,-1.80361 -1.702653,-3.47002 -2.45194,-5.08146 -1.522637,-3.27446 -2.12441,-6.86198 -0.876797,-10.31691 2.536635,-7.02427 9.69978,-12.37089 17.392505,-10.2935 1.408564,0.38034 3.114343,1.03831 4.212411,2.01118 3.377648,2.99283 3.140908,7.03213 4.382113,10.90005 2.215669,-1.57033 3.473282,-4.34881 5.625507,-6.08775 4.834811,-3.90687 11.83231,-3.26938 16.72025,0.30997 1.71469,1.25574 3.09184,3.12186 4.0224,5.00786 0.36472,0.73927 0.55317,2.43663 1.22229,2.92138 0.6885,0.4989 2.51726,0.15829 3.34984,0.15829 -0.79586,-8.9928 -10.83598,-15.61317 -19.53301,-14.7561 -3.636264,0.35816 -6.332288,2.15069 -9.21958,4.13123 -2.891979,-7.67979 -12.876941,-10.56636 -20.158066,-7.84301 -2.456003,0.91851 -4.317421,2.46082 -6.100394,4.30138 -1.536232,1.58573 -2.989801,3.38841 -3.58798,5.54341 m 28.127535,-3.6956 c -1.797036,-1.36661 -2.92667,-3.19286 -5.00045,-4.3328 -4.974042,-2.73444 -11.439781,-2.48499 -16.251465,0.47012 -1.711717,1.05124 -2.793377,2.71534 -4.375394,3.86268 3.170442,-6.82056 13.753114,-7.85225 19.845538,-5.14506 2.226295,0.98934 4.87419,2.82006 5.781771,5.14506 m -23.283348,-1.69382 -2.969017,4.00357 h -0.156265 c 0.482856,-1.50319 1.831728,-3.10323 3.125282,-4.00357 m -3.43781,7.08324 -0.156264,0.15399 0.156264,-0.15399 m -0.156264,0.30797 -0.156264,0.9239 h -0.156264 l 0.312528,-0.9239 m -0.312528,1.07789 -0.156264,0.9239 h -0.156264 l 0.312528,-0.9239 m -0.312528,1.07788 v 6.15935 h -0.156264 c -0.239084,-1.86428 -0.788665,-4.40794 0.156264,-6.15935 m 89.070523,6.31333 -0.78132,-1.53983 c -0.92258,0.17585 -2.28646,0.9142 -2.90245,1.63192 -0.34894,0.40651 -0.0528,1.18044 0.46145,1.33442 0.77835,0.23313 2.55054,-1.04016 3.22232,-1.42651 m -88.914259,0.15399 0.156264,0.76992 h -0.156264 v -0.76992 m 0.312528,1.07788 1.093849,3.07968 h -0.156264 l -0.937585,-3.07968 m 13.438711,0.92391 v 11.54877 c 0.557082,0 1.63296,0.2011 2.09347,-0.15829 0.741786,-0.57898 0.250491,-3.71563 0.250491,-4.6152 h 3.594074 v -2.00179 l -3.594074,0.15398 v -2.92569 h 3.906603 v -2.00178 H 75.67876 m 7.813204,0 v 6.31333 c 0,1.20138 -0.144856,2.44187 0.441446,3.54162 1.361061,2.55274 6.576999,2.61156 8.097918,0.15168 1.694371,-2.74014 0.262523,-6.80639 0.836481,-9.85265 l -2.343961,-0.15398 v 4.15756 c 0,1.43297 0.293777,3.30017 -0.420038,4.61288 -0.767413,1.41142 -3.163722,1.30948 -3.977546,0.004 -0.906956,-1.45468 -0.290338,-4.63691 -0.290338,-6.31102 0,-0.55942 0.250022,-1.91478 -0.250492,-2.30544 -0.46051,-0.3594 -1.536388,-0.1583 -2.09347,-0.1583 m 11.876071,0 v 11.54878 h 2.187697 l -0.156264,-7.69918 3.279822,5.54341 1.3345,1.99748 2.88635,0.15829 v -11.54876 h -2.18769 l 0.15626,7.69918 -3.237635,-5.38943 -1.389344,-2.15146 -2.873696,-0.15829 m 12.188595,0 v 11.54877 c 2.44694,0 4.98857,0.44856 7.18799,-0.91636 3.00418,-1.86428 3.59251,-7.59832 0.46661,-9.6617 -2.15707,-1.42389 -5.19657,-0.97071 -7.6546,-0.97071 m 9.68837,11.54877 c 0.61334,0 1.8758,0.23929 2.33052,-0.24683 0.48567,-0.51908 0.36035,-1.50104 0.99822,-1.90463 0.68584,-0.43392 2.28552,-0.1894 3.07793,-0.15537 1.5117,0.065 0.93337,1.46408 1.83267,2.14854 0.51708,0.39358 1.76188,0.15829 2.38662,0.15829 -0.21064,-2.3618 -1.6278,-4.84248 -2.396,-7.08325 -0.42675,-1.24511 -0.76897,-3.04133 -1.55357,-4.10859 -0.38035,-0.51739 -1.86486,-0.514 -2.41382,-0.26408 -0.72053,0.32814 -1.05228,2.13652 -1.29308,2.83284 -0.97587,2.82236 -2.35068,5.70617 -2.96949,8.62308 m 19.37675,-0.30797 -0.15627,-2.00178 c -1.41919,0.11425 -2.89447,0.70801 -4.20506,-0.17447 -2.13301,-1.43651 -1.84251,-5.32752 0.29862,-6.59958 1.11526,-0.66244 2.57898,-0.32552 3.75018,-0.001 l 0.31253,-2.15577 c -2.22598,-0.54033 -4.93545,-0.55327 -6.6906,1.12423 -2.41038,2.3039 -2.43804,7.95772 0.75256,9.64754 1.8558,0.98288 3.99927,0.59776 5.93804,0.16107 m 4.21913,0.30796 v -11.5488 l -2.18332,0.24683 -0.16064,2.37089 0.14235,6.15935 0.0205,2.52487 2.18114,0.24683 m 6.25056,-11.47717 c -7.29347,1.29577 -5.35204,12.71751 2.03144,11.40572 7.11673,-1.26451 5.15421,-12.6824 -2.03144,-11.40572 m 8.12573,-0.0716 v 11.54877 h 2.1877 v -7.69918 h 0.15627 c 0.52973,1.81193 1.79297,3.46279 2.74649,5.08146 0.43426,0.73743 0.83211,1.78159 1.46545,2.37089 0.49786,0.46303 2.85572,0.51584 3.08278,-0.23791 0.70678,-2.34578 0.0497,-5.83829 0.0497,-8.29232 0,-0.60639 0.2858,-2.19489 -0.25049,-2.61342 -0.53646,-0.41868 -1.94237,-0.27332 -2.07035,0.46673 -0.39066,2.25971 -0.0486,4.95904 0.13314,7.22815 l -3.00511,-5.23545 -1.58749,-2.45943 -2.90808,-0.15829 m -8.59452,1.23187 -0.31253,0.9239 0.15627,-0.46195 -0.4688,0.15398 0.31253,-0.61593 h 0.31253 m 2.03143,0 -1.56264,0.9239 0.31253,-0.61593 -0.46879,-0.15399 1.7189,-0.15398 m -3.43781,0.30797 0.4688,0.46195 -0.4688,0.15398 v 0.30797 c 0.61881,0.0426 1.20027,-0.26008 1.40638,0.46195 l -2.33959,1.54846 0.46442,0.76129 c -2.13425,-0.94469 -1.2373,-2.85424 0.46879,-3.6956 m 7.96947,3.84959 -1.87517,-1.23187 v 0.15398 l 0.62506,0.30797 -0.62506,0.46195 -0.62505,-0.76992 0.93758,1.07789 c -0.50364,0.9008 -0.59724,2.13668 -1.7189,2.46374 -0.0761,-0.60254 -0.0438,-1.46716 -0.45536,-1.95898 -0.27659,-0.33076 -0.87195,-0.31013 -1.05541,-0.70756 -0.30252,-0.65505 0.44536,-1.25142 1.04432,-1.22001 0.47332,0.025 0.92242,0.17723 1.40403,0.19094 -0.47911,-0.8192 -1.22839,-0.83675 -2.03143,-0.46195 l 0.62505,-1.07789 0.62506,0.15399 0.15626,-0.76992 -0.31252,0.46195 -0.4688,-0.15399 c 1.97721,-1.98931 3.71471,1.43113 3.75034,3.07968 m -43.28515,4.15756 v -7.5452 c 1.22105,0 2.54539,-0.1757 3.58736,0.58513 1.83547,1.34043 1.65499,5.11657 -0.15189,6.39818 -1.00463,0.71248 -2.26771,0.56189 -3.43547,0.56189 m 12.65739,-6.6213 1.40638,4.46553 h -2.96902 l 1.56264,-4.46553 m -67.506079,2.15577 v 0.15398 c 3.294047,3.52454 6.24275,7.40508 9.373501,11.07312 0.540049,0.63257 2.440689,3.65619 3.381868,2.71566 0.797259,-0.79671 -1.817352,-3.17391 -2.363807,-3.80601 -3.056097,-3.5347 -6.483281,-7.07587 -9.141489,-10.90667 l -1.250113,0.76992 m 91.101959,4.00357 c -0.50739,-0.52693 -1.46576,-2.98128 -0.80351,-3.57242 0.5363,-0.47873 1.68828,0.56774 1.69562,1.1247 0.0119,0.88848 -0.88024,1.52028 -0.89211,2.44772 m -95.008561,-0.76992 v 0.15399 l 12.032335,14.32048 2.656489,-2.00179 -3.371554,-4.31154 -8.504516,-10.16292 -2.812754,2.00178 m 10.782222,15.55236 c -1.335433,-1.95652 -3.076527,-3.7415 -4.621667,-5.54342 -1.094004,-1.27606 -2.18129,-2.55936 -3.257793,-3.84974 -0.598179,-0.71695 -1.200421,-1.43159 -1.806569,-2.14192 -0.635683,-0.74466 -1.370749,-2.0429 -2.234733,-2.51624 -0.492701,-0.26994 -1.312775,0.26593 -1.307774,0.81472 0.0092,1.01907 2.030183,2.73783 2.684617,3.49158 2.308489,2.65823 4.570099,5.3668 6.830303,8.0649 1.158698,1.38324 1.977991,3.29679 3.713616,1.68012 M 75.67876,206.2945 v 6.15935 h 3.43781 l -0.156264,-1.07789 h -2.031433 v -1.53984 h 2.031433 v -1.07788 h -2.031433 v -1.38585 h 2.187697 c -0.05391,-1.61822 -2.217544,-1.07789 -3.43781,-1.07789 m 4.531659,0 v 6.15935 c 1.142603,0.0939 2.738215,0.22189 3.747994,-0.38234 1.641866,-0.98242 2.061435,-3.96401 0.454728,-5.19187 -1.143072,-0.87355 -2.84885,-0.58514 -4.202722,-0.58514 m 6.094299,0 c 0,1.53629 -0.472699,4.01112 0.334405,5.38265 0.887893,1.50904 3.697833,1.13748 4.438369,-0.30181 0.674592,-1.31101 0.227677,-3.63401 0.227677,-5.08084 -2.375527,0.0277 -0.643652,3.18777 -1.434348,4.61042 -0.448947,0.80796 -1.637961,0.78086 -2.088314,-0.008 -0.393004,-0.68799 -0.227676,-1.68796 -0.227676,-2.44695 v -2.15577 h -1.250113 m 10.313429,4.92748 c -0.666466,0.12549 -1.38825,0.31551 -2.016744,-0.0451 -1.266677,-0.72711 -1.210734,-2.74584 -0.0078,-3.49512 0.64287,-0.40036 1.320275,-0.21004 2.024557,-0.15537 0.274869,-1.54384 -1.533888,-1.49873 -2.655864,-0.99197 -1.19417,0.53925 -1.764378,1.90139 -1.703122,3.14774 0.0636,1.29331 0.700844,2.42986 2.015025,2.80419 1.103068,0.31413 2.767437,0.20111 2.343961,-1.26436 m 0.468793,1.23187 2.052216,-1.13901 2.010651,-0.0928 0.31253,1.23187 h 1.40637 c -0.4041,-1.68012 -1.18245,-3.29233 -1.74484,-4.92733 -0.25034,-0.72788 -0.56912,-1.44005 -1.5142,-1.18244 -0.586928,0.15999 -0.733191,0.9972 -0.906332,1.49026 -0.537861,1.53182 -1.183544,3.05657 -1.616395,4.61951 m 6.406817,-6.15935 v 6.15935 h 1.25012 v -2.46374 h 0.15626 c 0.48817,1.5095 1.35122,2.4625 2.96902,2.46374 l -1.71891,-2.77171 c 1.28356,-0.33738 2.06519,-2.18503 0.72991,-3.03671 -0.91946,-0.58653 -2.34646,-0.35093 -3.3864,-0.35093 m 7.18815,0 v 6.15935 h 1.25011 v -2.00179 c 1.64093,-0.12873 4.16819,-1.88199 2.2824,-3.59737 -0.9004,-0.81888 -2.41163,-0.56019 -3.53251,-0.56019 m 5.78177,0 -2.03143,6.15935 h 1.25011 l 0.31253,-1.23187 c 1.28215,0 2.30255,-0.21404 2.65649,1.23187 h 1.40638 l -1.40591,-4.15756 -0.73522,-1.75495 -1.45295,-0.24684 m 4.21913,6.15935 h 1.40638 l -0.15627,-2.15577 c 1.33091,1.06772 1.37341,2.15561 3.28155,2.15577 l -1.87517,-2.77171 c 1.25715,-0.25069 2.05441,-1.81762 1.02619,-2.83977 -0.54489,-0.54171 -3.15763,-1.05371 -3.58845,-0.19094 -0.68366,1.36938 -0.0316,4.2635 -0.0942,5.80242 m 4.68792,0 2.81276,-1.23049 2.96902,1.23049 -2.1877,-6.15935 c -2.45991,0.002 -2.93589,4.16526 -3.59408,6.15935 m 8.282,-6.00537 0.15627,6.00537 h 3.12528 l 0.15626,-1.07789 -2.1877,-0.15398 c 0.38582,-1.28592 0.84571,-5.37711 -1.25011,-4.7735 m 3.59408,6.00537 c 1.35981,-0.0159 3.525,-2.83515 4.21913,0 h 1.40637 c -0.28534,-1.63362 -1.11385,-3.21164 -1.66515,-4.7735 -0.24674,-0.69924 -0.39363,-1.41619 -1.29777,-1.37384 -0.77976,0.0365 -0.88477,0.77223 -1.10823,1.37384 -0.56864,1.53106 -1.31199,3.15605 -1.55435,4.7735 m 7.50067,-6.00537 c 0.51333,1.49534 1.08682,2.97281 1.61046,4.46553 0.18705,0.5334 0.26174,1.31625 0.9068,1.49072 1.05884,0.28656 1.31449,-0.55388 1.61186,-1.33674 0.58006,-1.52613 1.14089,-3.06966 1.65265,-4.61951 -1.96799,-0.56681 -2.44037,3.05073 -2.81275,4.46553 -0.61881,-1.41526 -0.83648,-5.07931 -2.96902,-4.46553 m 6.40683,-0.15398 v 6.15935 h 1.25011 v -6.15935 h -1.25011 m 2.65649,0 v 6.15935 c 1.24105,0.13057 2.99589,0.19171 4.04833,-0.56959 1.41341,-1.0226 1.62796,-3.94491 0.15439,-5.01971 -1.14463,-0.8349 -2.87041,-0.57005 -4.20272,-0.57005 m 5.31298,6.15935 c 1.35981,-0.0159 3.525,-2.83515 4.21913,0 h 1.40637 c -0.36659,-1.5614 -1.01649,-3.12094 -1.59264,-4.61951 -0.19611,-0.51 -0.31487,-1.32041 -0.92836,-1.49072 -0.954,-0.26501 -1.23871,0.44609 -1.48983,1.18275 -0.54645,1.60405 -1.36324,3.24952 -1.61467,4.92748 m -77.663289,-0.92391 v -4.15755 c 1.894077,0.001 3.910665,1.96621 1.944238,3.65557 -0.539736,0.46364 -1.273396,0.44717 -1.944238,0.50198 m 23.283349,-2.46373 v -1.69382 c 1.86126,0.0166 1.81969,1.65039 0,1.69382 m 7.18814,-1.69382 c 0.29956,0.003 0.63115,-0.0232 0.92134,0.0668 1.442,0.44716 -0.0859,2.45449 -0.7607,1.68196 -0.3305,-0.37865 -0.16064,-1.28253 -0.16064,-1.74879 m 10.38172,0.093 c 0.95055,-0.44132 1.5717,0.91912 0.69006,1.41849 -1.02618,0.58129 -1.45794,-1.06202 -0.69006,-1.41849 m 32.74717,4.06455 v -4.15756 c 0.62303,0 1.3184,-0.0778 1.85814,0.29165 2.16254,1.47978 0.0355,3.82726 -1.85814,3.86591 m -55.00495,-3.54163 0.62505,2.30976 h -1.562637 l 0.937587,-2.30976 m 17.18904,0 0.78132,2.30976 h -1.56264 l 0.78132,-2.30976 m 11.09475,0 0.62506,2.30976 h -1.56264 l 0.62505,-2.30976 h 0.31253 m 11.71981,0 0.78132,2.15578 h -1.71891 l 0.93759,-2.15578 m 21.87697,0 0.62506,2.30976 -1.56264,-0.15398 0.93758,-2.15578 m -88.601731,16.32227 c -0.07126,-0.80472 -0.559113,-3.45893 -1.441536,-3.74057 -0.823043,-0.2627 -3.019491,1.49303 -2.816348,2.33855 0.210019,0.87478 2.52679,1.7705 3.320299,2.01796 l -0.156264,0.46195 c 2.275831,-0.22975 4.958572,-2.48915 7.031884,-3.50344 3.938324,-1.9268 8.226992,-2.83207 12.188599,-4.6577 l 0.156264,0.15399 c -0.197831,0.80903 0.160014,1.27282 0.937584,1.53983 -0.893518,-1.4265 0.480356,-2.06276 1.875169,-1.8478 -0.39441,0.73758 -0.694281,1.54122 -1.027124,2.30975 -0.529891,1.22387 -1.695934,4.40886 1.027124,3.38841 0.278775,-0.1044 0.538955,-0.26054 0.781321,-0.43023 1.413565,-0.99042 2.468035,-2.53149 3.496096,-3.88208 0.592397,-0.77823 1.131039,-1.73432 2.129413,-2.00179 v -0.15398 c -0.71757,-0.19387 -1.303245,-0.0485 -1.846262,0.48243 -1.372937,1.34305 -2.036903,3.24628 -3.466875,4.59287 -0.199706,0.18802 -0.402224,0.3788 -0.6249,0.54064 -2.171134,1.57787 -1.182607,-1.33489 -0.737098,-2.38228 0.363314,-0.85384 0.616618,-1.69829 0.737098,-2.61773 l 1.250112,0.15399 c -1.519512,-1.62746 -3.36921,-0.17847 -5.156715,-0.1546 -1.203858,0.0162 -2.569606,-0.18678 -3.750338,0.0607 -5.21547,1.09282 -9.304744,5.07484 -13.907503,7.33116 m 25.783574,-5.38943 c 0.612867,-0.0998 0.778976,-0.34431 0.937587,-0.9239 l -0.937587,0.9239 m 2.343957,2.46374 h -0.15626 c 0.28049,-1.01306 0.88836,-2.1068 -0.62506,-2.15577 0.46458,1.24157 -0.856324,2.45604 -2.031429,2.77171 l 0.937584,-2.46374 c -1.896733,-0.43501 -2.258172,4.15324 0.15392,2.49407 0.399875,-0.27501 0.727095,-0.64334 1.096195,-0.95424 -0.20924,0.65043 -0.4788,1.2408 0.15626,1.69382 0.73366,-1.17597 1.5478,-2.31175 2.65649,-3.18068 0.84835,-0.6649 1.82891,-0.43809 2.18769,-1.59281 -1.8436,0.48844 -3.49906,1.69598 -4.37539,3.38764 m 49.84824,0 c 0.2805,-1.01306 0.88836,-2.1068 -0.62505,-2.15577 0.47441,1.26806 -0.75476,2.30421 -1.87517,2.77171 l 1.40637,-2.61773 -1.40637,-0.15398 0.31253,-1.07789 c -1.98034,0.98088 -1.86642,3.8593 -4.68793,4.00358 l 0.15627,-1.07789 c 0.68647,0.16892 2.96308,-0.53863 2.18035,-1.57956 -0.83086,-1.10468 -3.00386,1.03492 -3.06528,1.88738 -0.0777,1.07927 1.18167,1.22371 1.97878,0.97749 1.23339,-0.38081 2.28161,-1.72354 2.81275,-2.82514 l 0.78132,0.15398 c -0.42207,0.59807 -1.15464,1.21493 -1.17542,1.99886 -0.0489,1.84134 2.33974,-0.22173 2.73806,-0.61301 -0.21689,0.67599 -0.39238,1.15812 0.15626,1.69382 0.73366,-1.17597 1.5478,-2.31175 2.65649,-3.18068 0.82836,-0.6492 1.86877,-0.45133 2.1877,-1.59281 -2.0405,0.54064 -3.20123,1.8766 -4.53166,3.38764 m -22.97082,0.61594 c 0.0745,-0.31659 0.1597,-0.61871 0.27268,-0.92468 0.9029,-2.44618 -2.16941,0.67014 -2.92917,0.92468 0.57912,-1.32134 1.73282,-2.45897 3.28155,-2.30976 -0.9293,-1.29608 -3.42093,0.35986 -3.67565,1.53968 -0.22752,1.05371 0.91399,1.24435 1.61703,0.76576 0.30565,-0.20818 0.55426,-0.50244 0.80851,-0.7656 0.27518,2.88057 3.2792,-0.48705 3.75033,-1.69382 l 0.78132,0.15398 c -0.34971,0.66814 -2.06221,3.80509 0.30863,2.5124 0.27127,-0.14783 0.52551,-0.34431 0.78522,-0.51061 0.62568,1.14179 1.86861,0.45979 2.34396,-0.46195 h 0.15627 c 0.0727,2.19873 2.43897,0.696 2.81275,-0.61594 l -2.1877,1.23187 0.62506,-2.00179 -3.28154,2.15578 c 0.58724,-1.32396 1.72578,-2.45974 3.28154,-2.30976 -1.31324,-1.83163 -4.20397,1.69921 -5.15671,2.46374 l 1.25011,-2.77171 -1.25011,-0.15398 0.31252,-0.9239 c -1.79875,0.35893 -1.82422,3.1619 -3.9066,3.69561 m 26.25237,0.15398 0.62505,-2.77171 h -0.62505 c -0.1672,0.516 -0.48301,0.90081 -0.70975,1.38586 -0.39754,0.84999 0.14313,1.94743 1.17854,1.52536 1.33309,-0.54341 1.8236,-2.57954 3.28155,-2.60325 -0.38441,0.60162 -1.25371,1.36845 -1.14901,2.14669 0.23205,1.72692 2.48116,-0.55481 2.71165,-1.22279 l -2.03144,1.38586 1.40638,-2.61773 -1.40638,-0.15398 0.4688,-0.9239 c -1.25574,0.16692 -1.06526,0.99304 -1.65765,1.8478 -0.53661,0.77423 -1.34169,1.4379 -2.09269,2.00179 m -39.84734,-0.46198 c 0.40644,-0.85815 0.58739,-3.09784 -1.09323,-2.28158 -1.26402,0.61394 -1.70249,2.11651 -3.1259,2.58955 l 0.62505,-2.30976 -1.56264,0.61594 c 0.44176,-2.09156 -1.81891,0.0987 -2.34396,0.61593 l 0.46879,-1.53984 -3.28154,2.61773 0.78132,-2.61773 -1.71891,1.69382 v 0.15399 c 0.95306,1.6775 1.70188,1.14256 2.96902,-0.15399 l -0.46879,1.38586 2.96902,-2.46374 -0.4688,1.8478 1.71891,-1.38585 c -0.86258,2.01426 0.77976,2.32346 2.03143,0.9239 0.44926,2.1918 3.78191,0.32922 4.3754,-0.9239 1.14682,0.71587 1.09213,1.66995 -0.31253,2.00179 l 0.31253,-0.46195 -0.15627,-0.15399 c -2.05315,1.70044 3.62564,0.58714 1.38716,-1.03354 -0.23471,-0.16984 -0.49348,-0.25484 -0.7621,-0.35231 0.33722,-0.93453 1.21745,-1.41988 2.1877,-1.53984 l -0.31253,0.61594 c 1.37918,-0.47812 -0.24862,-1.2947 -1.24949,-0.79471 -1.29699,0.64811 -1.60936,2.25509 -2.96964,2.95048 m 25.93983,-0.61594 0.62506,-0.61593 1.09385,0.61593 c -0.26909,0.77762 -0.741,1.22233 -1.56264,1.38586 v -0.15399 l 0.46879,-0.30796 c -0.32768,0.0152 -1.14026,0.36448 -0.55833,0.76021 0.5924,0.40282 1.70578,-0.28933 2.02362,-0.77469 0.57161,-0.87309 -0.59052,-1.04986 -0.78617,-1.71091 -0.2408,-0.8135 1.26027,-1.25574 1.82111,-1.35429 l -0.15627,0.61594 c 0.93509,-0.51446 0.21643,-1.15842 -0.62505,-1.04432 -1.39216,0.18894 -1.92627,1.43343 -2.34397,2.58415 m -20.93938,4.7735 c 1.64812,-0.33584 0.92414,-2.22168 1.95486,-3.14142 0.93977,-0.83844 2.3349,-0.58514 3.01746,-1.9402 0.79367,-1.5754 -1.20167,-1.40032 -2.0033,-0.76976 0.0706,-0.23791 0.24017,-1.24758 -0.38035,-0.8968 -0.39316,0.2222 -0.55411,1.26574 -0.70569,1.66672 -0.59896,1.5848 -1.70906,3.40812 -1.88298,5.08146 m -5.15672,-6.15935 c 0.045,0.5545 -0.39847,3.0167 -1.46607,2.29651 -0.98712,-0.66598 0.88868,-2.1473 1.46607,-2.29651 m 9.68838,0 c -0.23065,1.25497 -1.20683,1.98008 -2.34397,2.46374 0.22002,-1.20169 1.07151,-2.2962 2.34397,-2.46374 m 22.1895,0 c -0.35816,0.69493 -0.9479,1.08066 -1.71891,1.23187 0.42473,-0.6649 0.92915,-1.07696 1.71891,-1.23187 m 13.75124,2.61772 0.78132,-0.46195 -0.78132,0.46195 m 2.03143,0 0.62505,-0.61593 -0.62505,0.61593 m 1.87517,0 h 0.62505 l 0.15627,-0.61593 z"
                        id="path302" />
                </g>
            </svg>

        </Box>
    );

    //   if (disabledLink) {
    //     return <>{logo}</>;
    //   }

    return <RouterLink to="/">{logo2}</RouterLink>;
}
